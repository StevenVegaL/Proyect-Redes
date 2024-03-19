

//---------------------------------------

const express = require('express');
const mongoose = require('mongoose');
const proveeRoute = require('./src/routes/proveeroute');

const app = express();
const port = 3000;

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/sabortostado', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Uso de las rutas para proveedores
app.use('/api/proveedores', proveeRoute);

app.listen(port, () => {
  console.log(`Microservicio de proveedores corriendo en el puerto ${port}`);
});
