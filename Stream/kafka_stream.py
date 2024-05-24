import json
import requests
from pymongo import MongoClient
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, count
from concurrent.futures import ThreadPoolExecutor
from kafka import KafkaConsumer, KafkaProducer

# Crear una sesión de Spark
spark = SparkSession.builder.appName("CafeOnlineStoreApp").getOrCreate()
spark.sparkContext.setLogLevel("OFF")

# Crear un ThreadPoolExecutor con el número de hilos deseado
executor = ThreadPoolExecutor(max_workers=5) 

# Configuración de MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["cafe_online_store_db"]
stats_col = db["product_stats"]
stats_col.update_many({}, {"$set": {"stats": {}}})

# Configuración de Kafka
kafka_broker_host = "localhost:9092"
topic_name = "product_updates"

producer = KafkaProducer(bootstrap_servers=kafka_broker_host, value_serializer=lambda v: json.dumps(v).encode('utf-8'))

# Configuración de los endpoints de los microservicios
MICROSERVICE_ENDPOINTS = {
    'usuarios': 'http://microuser:3001/api/usuarios',
    'pedidos': 'http://micropedidos:3002/api/pedidos',
    'productos': 'http://microproduct:3003/api/productos'
}

# Función para obtener datos de los microservicios
def fetch_microservice_data(endpoint):
    response = requests.get(endpoint)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching data from {endpoint}: {response.status_code}")
        return None

# Callback que se ejecuta cuando se recibe un mensaje Kafka
def on_message(message):
    message = json.loads(message.value.decode())
    message_id = message['id']

    if message["type"] == "product":
        product_id = message['id']
        print(f"Received message for product {product_id}")
        executor.submit(process_product, product_id)
    else:
        print(f"Unknown message type received: {message['type']}")

# Función para procesar datos de productos
def process_product(product_id):
    product_data = df.filter(col("ProductID") == product_id)
    total_sales = product_data.select("Sales").sum()
    total_stock = product_data.select("Stock").sum()
    average_price = product_data.select("Price").avg()
    stats = {
        "total_sales": total_sales,
        "total_stock": total_stock,
        "average_price": average_price
    }
    stats_col.update_one({'product_id': product_id}, {'$set': {'stats': stats}})
    print(f"Updated stats for product {product_id}")

# Función para leer datos de los microservicios y enviar a Kafka
def read_and_send_microservice_data():
    for service, url in MICROSERVICE_ENDPOINTS.items():
        data = fetch_microservice_data(url)
        if data:
            for item in data:
                producer.send(topic_name, item)
                producer.flush()

# Crear un consumidor de Kafka
consumer = KafkaConsumer(
    topic_name,
    bootstrap_servers=[kafka_broker_host],
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='product_stats_group',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

# Iniciar la lectura de datos de los microservicios
read_and_send_microservice_data()

# Escuchar mensajes de Kafka
for message in consumer:
    on_message(message)
