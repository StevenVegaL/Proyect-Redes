const express = require('express');
const { connectDB } = require('./src/db/config');
const proveeRoute = require('./src/routes/proveeroute');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Rutas para los proveedores
app.use('/api/proveedores', proveeRoute);

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
