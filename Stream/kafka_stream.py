import json
import sys
from pymongo import MongoClient
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, count
from concurrent.futures import ThreadPoolExecutor

# Crear una sesión de Spark
spark = SparkSession.builder.appName("CafeOnlineStoreApp").getOrCreate()
spark.sparkContext.setLogLevel("OFF")

# Crear un ThreadPoolExecutor con el número de hilos deseado
executor = ThreadPoolExecutor(max_workers=5) 

# Lee el archivo CSV con los datos de productos de café
print("Comenzando a leer los archivos CSV...")
df = spark.read.csv(sys.argv[1], header=True, inferSchema=True)
print("Archivos CSV leídos correctamente.")

# Conectarse a la instancia local de MongoDB
client = MongoClient("mongodb://mongodb:27017/")
db = client["cafe_online_store_db"]
print("Conectado a la base de datos")

# Seleccionar la colección que deseas utilizar
stats_col = db["product_stats"]
stats_col.update_many({}, {"$set": {"stats": {}}})

from kafka import KafkaConsumer, KafkaProducer

kafka_broker_host = "localhost:9092"  # dirección del broker Kafka
topic_name = "product_updates"  # nombre del topic en Kafka

producer = KafkaProducer(bootstrap_servers=kafka_broker_host, value_serializer=lambda v: json.dumps(v).encode('utf-8'))


def on_message(message):
    message = json.loads(message.value.decode())
    message_id = message['id']

    if message["type"] == "product":
        product_id = message['id']
        print(f"Received message for product {product_id}")
        executor.submit(process_product, product_id)
    else:
        print(f"Unknown message type received: {message['type']}")

def process_product(product_id):
    # Filtrar los productos por ID y procesar los datos
    product_data = df.filter(col("ProductID") == product_id)
    total_sales = product_data.select("Sales").sum()
    total_stock = product_data.select("Stock").sum()
    average_price = product_data.select("Price").avg()
    # Estadísticas finales
    stats = {
        "total_sales": total_sales,
        "total_stock": total_stock,
        "average_price": average_price
    }
    stats_col.update_one({'product_id': product_id}, {'$set': {'stats': stats}})
    print(f"Updated stats for product {product_id}")

# Crear un consumidor de Kafka
consumer = KafkaConsumer(
    topic_name,
    bootstrap_servers=[kafka_broker_host],
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='product_stats_group',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

# Escuchar mensajes de Kafka
for message in consumer:
    on_message(message)
