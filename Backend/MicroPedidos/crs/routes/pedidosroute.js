const express = require('express');
const router = express.Router();
// Asume que pedidosController es un objeto exportado que contiene los métodos del controlador.
const pedidosController = require('../controllers/pedidoscontroller');

// Rutas para operaciones CRUD básicas
router.get('/', pedidosController.getAllPedidos);
router.get('/:id', pedidosController.getPedidoById);
router.post('/', pedidosController.createPedido);
router.put('/:id', pedidosController.updatePedido);
router.delete('/:id', pedidosController.deletePedido);

// Rutas para consultas específicas
router.get('/estado-envio/:estado', pedidosController.getPedidosPorEstadoEnvio);
router.get('/numero-factura/:numeroFactura', pedidosController.getPedidoPorNumeroFactura);
router.get('/ventas-en-dia', pedidosController.getVentasEnDia);
router.get('/pedidos-por-cliente/:clienteId', pedidosController.getPedidosPorCliente);

module.exports = router;
