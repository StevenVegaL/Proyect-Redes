const express = require('express');
const router = express.Router();
const proveeController = require('../controllers/proveecontroller');

router.post('/', proveeController.createProveedor);
router.get('/', proveeController.getProveedores);
router.get('/:id', proveeController.getProveedorById);
router.patch('/:id', proveeController.updateProveedor);
router.delete('/:id', proveeController.deleteProveedor);

module.exports = router;

