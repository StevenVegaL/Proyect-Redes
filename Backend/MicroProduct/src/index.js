const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./src/routes/productroute');
const { connectDB } = require('./src/db/config');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Rutas para los productos
app.use('/api/products', productRoute);

// Manejador de errores genérico
app.use((err, req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: err.message
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
