ls
cd json
ls
mongoimport --db tostado_db --collection usuario  --type json --file users.json --jsonArray

mongoimport --db tostado_db --collection Pedidos  --type json --file pedidos.json --jsonArray
mongoimport --db tostado_db --collection Producto  --type json --file producto.json --jsonArray
exit
ls
cd json
cd ..
exit
