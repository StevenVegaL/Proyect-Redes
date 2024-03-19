const express = require('express');
const proveeController = require('./proveecontroller'); // Asegúrate de que la ruta sea correcta
const router = express.Router();

router.use('/proveedores', proveeController);

module.exports = router;

