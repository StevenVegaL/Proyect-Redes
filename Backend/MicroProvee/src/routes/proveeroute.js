const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveecontroller');

// Rutas para el manejo de proveedores
router.post('/', proveedorController.createProveedor);
router.get('/', proveedorController.getAllProveedores);
router.put('/:proveedorId', proveedorController.updateProveedor);
router.delete('/:proveedorId', proveedorController.deleteProveedor);

module.exports = router;
