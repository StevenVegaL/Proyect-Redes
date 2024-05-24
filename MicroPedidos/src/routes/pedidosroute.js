const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidoscontroller');

// Obtener todos los pedidos
router.get('/', pedidosController.getAllPedidos);

// // Obtener un pedido por su ID
router.get('/:id', pedidosController.getPedidoById);

// // Crear un nuevo pedido
router.post('/', pedidosController.createPedido);

// // Actualizar un pedido existente por su ID
router.patch('/:id', pedidosController.updatePedido);

// // Eliminar un pedido por su ID
router.delete('/:id', pedidosController.deletePedido);

// // Obtener pedidos por estado de envío
router.get('/estado-envio/:estado', pedidosController.getPedidosPorEstadoEnvio);

// // Obtener un pedido por número de factura
router.get('/numero-factura/:numeroFactura', pedidosController.getPedidoPorNumeroFactura);


module.exports = router;
