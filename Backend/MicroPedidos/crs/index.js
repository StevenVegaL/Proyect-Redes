const express = require('express');
const mongoose = require('mongoose');
const pedidosRoute = require('./src/routes/pedidosroute');
const { connectDB } = require('./src/db/config');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Rutas para los pedidos
app.use('/api/pedidos', pedidosRoute);

// Manejador de errores genérico
app.use((err, req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: err.message
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
