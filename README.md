# Proyect-Redes
## Instalación
Para el funcionamiento de este proyecto se utilizará Docker, que es una plataforma de contenedores que permite empaquetar una aplicación junto con todas sus dependencias en un contenedor virtualizado que se puede ejecutar en cualquier sistema operativo, tambien usaremos Apache Spark para aprovechar su capacidad de procesamiento distribuido y su capacidad para manejar grandes conjuntos de datos.<br>
Recuerda que como vamos a usar dos maquinas virtuales, ambas necesitaran tener instalados estos elementos.<br>
Para instalarlos puedes usar los siguientes comandos:<br>
### Vagrantfile: 
Para el despligue de este proyecto necesitaremos una maquina virtual Linux Ubuntu 22.04 con una IP en especifico, la `192.168.100.2`, el motivo de esto es porque la configuración del proyecto esta mapeada sobre dicha IP, por lo que usar otra IP diferente podria generar conflictos y pasos innecesarios, y por ende hemos decidido especificarla:<br>
Si aun no tiene Vagrant, puede descargarlo de la pagina oficial:<br> 
https://developer.hashicorp.com/vagrant/downloads?product_intent=vagrant <br>
```
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  if Vagrant.has_plugin? "vagrant-vbguest"
    config.vbguest.no_install  = true
    config.vbguest.auto_update = false
    config.vbguest.no_remote   = true
  end
  
  config.vm.define :servidorUbuntu do |servidorUbuntu|
    servidorUbuntu.vm.box = "bento/ubuntu-22.04"
    servidorUbuntu.vm.network :private_network, ip: "192.168.100.2"
    servidorUbuntu.vm.hostname = "servidorUbuntu"
    servidorUbuntu.vm.box_download_insecure=true
    servidorUbuntu.vm.provider "virtualbox" do |v|
      v.cpus = 4
      v.memory = 6144      
    end
  end

  config.vm.define :clienteUbuntu do |clienteUbuntu|
    clienteUbuntu.vm.box = "bento/ubuntu-22.04"
    clienteUbuntu.vm.network :private_network, ip: "192.168.100.3"
    clienteUbuntu.vm.hostname = "clienteUbuntu"
    clienteUbuntu.vm.box_download_insecure=true
  end
  
  config.vm.provider :virtualbox do |vb|
    vb.gui = true
  end
end
```

### Docker:
Necesitaremos Docker en las 2 maquinas de servidorUbuntu y clienteUbuntu.<br>
1. Quitar versiones de docker anteriores:<br>
`sudo apt-get remove docker docker-engine docker.io containerd runc`<br>
y luego  `sudo apt-get update`
2. Instala paquetes para permitir que APT use un repositorio sobre HTTPS: <br>
```
 sudo apt-get install \
 apt-transport-https \
 ca-certificates \
 curl \
 gnupg-agent \
 software-properties-common
 ```
 
3. Agregue la clave GPG oficial de docker:<br>
`curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`
4. Agregue la clave:<br>
`sudo apt-key fingerprint 0EBFCD88`
5. Agregue repositorio estable:<br>
```
sudo add-apt-repository \
 "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
 $(lsb_release -cs) \
 stable"
 ```
 
6. Instale la ultima version de docker:<br>
`sudo apt-get update`<br>
`sudo apt-get install docker-ce docker-ce-cli containerd.io`
### docker-compose:
Necesitaremos Docker-compose en las 2 maquinas de servidorUbuntu y clienteUbuntu.<br>
1. Instale DockerCompose:<br>
`sudo apt-get install docker-compose-plugin`<br>
2. Cree el archivo ~/.vimrc para trabajar con Yaml:<br>
`vim ~/.vimrc`<br>
3. Agregar la siguiente configuración para trabajar conlos archivos yaml.<br>

```
" Configuracion para trabajar con archivos yaml
au! BufNewFile,BufReadPost *.{yaml,yml} set filetype=yaml foldmethod=indent
autocmd FileType yaml setlocal ts=2 sts=2 sw=2 expandtab
```

### Apache Spark:
 1. Instala paquetes de Java:<br>
`sudo apt install -y openjdk-18-jdk`<br>
 2. Creamos el archivo jdk18.sh para la configuración:<br>
```
cat <<EOF | sudo tee /etc/profile.d/jdk18.sh
export JAVA_HOME=/usr/lib/jvm/java-1.18.0-openjdk-amd64
export PATH=\$PATH:\$JAVA_HOME/bin
EOF
```
3. Despues de este, hacemos:<br>
`source /etc/profile.d/jdk18.sh`
4. Crearemos el dictorio en donde guardaremos los archivos de Spark:<br>
`mkdir labSpark`<br>
`cd labSpark`
5. Descargamos el archivo comprimido de Spark:<br>
`wget https://dlcdn.apache.org/spark/spark-3.4.0/spark-3.4.0-bin-hadoop3.tgz`
6. Y lo descomprimimos:<br>
`tar -xvzf spark-3.4.0-bin-hadoop3.tgz`
7. Luego entramos a `/labSpark/spark-3.3.1-bin-hadoop3/conf` y hacemos una copia del archivo de configuración:<br>
`cp spark-env.sh.template spark-env.sh`<br>
Y introducimos estas instrucciones:<br>
En servidorUbuntu:<br>
```
SPARK_LOCAL_IP=192.168.100.2
SPARK_MASTER_HOST=192.168.100.2
```
En clienteUbuntu:<br>
```
SPARK_LOCAL_IP=192.168.100.3
SPARK_MASTER_HOST=192.168.100.2
```
### Librerias:
1. Editor de texto Vim:<br>
`sudo apt-get install vim -y`<br>
2. Zip y Unzip para descomprimir archivos:<br>
`sudo apt-get install zip unzip -y`<br>
### Pip y librerias de Python:
1. Instalamos PIP y Python:<br>
`sudo apt-get install python3`<br>
`sudo apt-get install pip`
2. Instalamos la libreria Pymogno:<br>
`sudo pip install pymongo`
3. Instalamos la libreria del Broker de mensajeria MQTT:<br>
`sudo pip install paho-mqtt`
4. Instalamos la libreria de PySpark:<br>
`sudo pip install pyspark`
## Configuración
Para configurar el contenedor Docker del proyecto, es necesario conocer los archivos Dockerfile que se han utilizado para crear las imágenes del contenedor. Cuando se descargue dentro de la carpeta `bbs71_git`, tendremos las siguientes subcarpetas `/bbs71_app` en donde se encuentran los archivos de toda la pagina como HTML, CSS y scripts, en `/bbs71_backend` tenemos todo lo relacionado con los microservicios y el apigateway y en `/bbs71_dockerfile` tenemos todos los archivos de la aplicacion incluido el docker-compose para hacer el despliegue, pero de aqui en adelante solo trabajaremos en el directorio de `bbs71_git/bbs71_docker` el cual contiene las subcarpetas donde estan los archivos necesario para la creacion de cada una de las imagenes del proyecto, las carpetas en cuestion son: `/db` correspondiende a la base de datos de mongodb, `/app` donde se encuentra todos los archivos de nuestra aplicacion web,`/backend` donde estan los microservicios, `/haproxy` donde esta nuestro balanceador, `/mqtt` el broker de mensajeria que usaremos, `/spark_app` donde estan los archivos que usaremos para el procesamiento de spark, dentro de cada carpeta se ha creado el Dockerfile que contienen las instrucciones para construir diferentes imágenes de Docker, cada una con su propia configuración y dependencias específicas. A continuación, se presentara una breve descripción y captura de cada uno de los Dockerfiles en sus repectivas carpetas utilizados en el proyecto.

### bbs71_docker:<br>

#### 1. Docker-compose principal<br>
Este es el docker-compose.yml principal, encargado de desplegar todos los servicios que necesitamos:<br>
```
version: "3"

services:
  mongo_db:
    image: mongo:4.0
    restart: always
    volumes:
      - ./db/mongo/data:/data/db
      - ./db/pedidos.json:/json/pedidos.json
      - ./db/producto.json:/json/producto.json
      - ./db/users.json:/json/users.json
    ports:
      - 27018:27017
    deploy:
      placement:
        constraints:
          - node.hostname == servidorUbuntu
  microuser:
    image: microuser:1.1

    depends_on:
      - mongo_db
    ports:
      - 3001:3001
    deploy:
      placement:
        constraints:
          - node.hostname == servidorUbuntu

  microproduct:
    image: microproduct:1.1
    depends_on:
      - mongo_db
    ports:
      - 3003:3003
    deploy:
      placement:
        constraints:
          - node.hostname == servidorUbuntu

  micropedidos:
    image: micropedidos:1.1
    depends_on:
      - mongo_db
    ports:
      - 3002:3002
    deploy:
      placement:
        constraints:
          - node.hostname == servidorUbuntu
  
  app-1:
    image: tostado-app
    depends_on:
      - microuser
      - microproduct
      - micropedidos
    deploy:
      placement:
        constraints:
          - node.hostname == clienteUbuntu

  app-2:
    image: tostado-app
    depends_on:
      - microuser
      - microproduct
      - micropedidos
    deploy:
      placement:
        constraints:
          - node.hostname == clienteUbuntu

  haproxy:
    build: ./haproxy
    ports:
      - "1080:80"
    depends_on:
      - app-1
      - app-2
    deploy:
      placement:
        constraints:
          - node.hostname == servidorUbuntu


  kafka-broker-1:
     image: confluentinc/cp-kafka:latest
     container_name: kafka
     depends_on:
       - zookeeper
     environment:
       KAFKA_BROKER_ID: 1
       KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
       KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_INTERNAL:PLAINTEXT
       KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092,PLAINTEXT_INTERNAL://broker:29092
       KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
       KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
       KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
     ports:
       - "9092:9092"
```
En el docker-compose se definen las imagenes de cada uno de los servicios y los parametros que se van a usar, para este proyecto utilizamos los siguientes servicios:

#### 2. /db:



