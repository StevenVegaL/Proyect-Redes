const express = require('express');
const mongoose = require('mongoose');
const pedidosRoutes = require('./routes/pedidosroute'); // Asegúrate de ajustar la ruta según tu estructura de archivos

const app = express();
const port = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect('tu_uri_de_mongodb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/pedidos', pedidosRoutes);

// Manejador de errores básico
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
