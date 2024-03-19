const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userroute'); // Asegúrate de que la ruta sea correcta

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect('tu_cadena_de_conexion_a_mongodb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No se pudo conectar a MongoDB', err));

app.use(express.json()); // Middleware para parsear JSON

// Usar las rutas de usuario
app.use('/api/usuarios', userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
