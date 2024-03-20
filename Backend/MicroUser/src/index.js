const express = require('express');
const { connectDB } = require('./src/db/config');
const userRoute = require('./src/routes/userroute');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Rutas para los usuarios
app.use('/api/users', userRoute);

// Manejador de errores genérico
app.use((err, req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: err.message
    });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
