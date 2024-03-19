
const express = require('express');
const router = express.Router();
const { obtenerProveedores, agregarProveedor } = require('../controllers/proveecontroller');

// Ruta para obtener todos los proveedores
router.get('/', obtenerProveedores);

// Ruta para agregar un nuevo proveedor
router.post('/', agregarProveedor);

module.exports = router;
