const express = require('express');
const mongoose = require('mongoose');
const proveeRoutes = require('./routes/proveeroute'); // Asegúrate de que la ruta sea correcta

const app = express();
const port = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect('tu_cadena_de_conexion_mongodb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB...'))
  .catch(err => console.error('No se pudo conectar a MongoDB...', err));

app.use(express.json()); // Middleware para parsear JSON

// Usar las rutas para el microservicio de proveedores
app.use('/api', proveeRoutes);

app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});
