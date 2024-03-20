const express = require('express');
const router = express.Router();
const proveeController = require('../controllers/proveecontroller');

router.get('/', proveeController.getAllProveedores);
router.get('/:id', proveeController.getProveedorById);
router.post('/', proveeController.createProveedor);
router.put('/:id', proveeController.updateProveedor);
router.delete('/:id', proveeController.deleteProveedor);

module.exports = router;


