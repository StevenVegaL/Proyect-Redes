const express = require('express');
const router = express.Router();
const Pedidos = require('../models/pedidosmodels'); // Ajusta la ruta al archivo de modelo
const Pedido = require('../models/pedidosmodels');
const { validationResult } = require('express-validator');

// exports.createPedido = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const newPedido = await Pedido.create(req.body);
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 pedido: newPedido
//             }
//         });
//     } catch (err) {
//         res.status(400).json({
//             status: 'fail',
//             message: err.message
//         });
//     }
// };



// // Middleware para obtener un pedido por ID
// async function getPedido(req, res, next) {
//     let pedido;
//     try {
//         pedido = await Pedidos.findById(req.params.id);
//         if (pedido == null) {
//             return res.status(404).json({ message: 'No se puede encontrar el pedido' });
//         }
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }

//     res.pedido = pedido;
//     next();
// }

// // Obtener todos los pedidos
// router.get('/', async (req, res) => {
//     try {
//         const pedidos = await Pedidos.find();
//         res.json(pedidos);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Obtener un pedido por ID utilizando el middleware getPedido
// router.get('/:id', getPedido, (req, res) => {
//     res.json(res.pedido);
// });

// // Crear un nuevo pedido
// router.post('/', async (req, res) => {
//     const pedido = new Pedidos(req.body);
//     try {
//         const nuevoPedido = await pedido.save();
//         res.status(201).json(nuevoPedido);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // Actualizar un pedido utilizando el middleware getPedido
// router.put('/:id', getPedido, async (req, res) => {
//     if (req.body.cliente_id != null) {
//         res.pedido.cliente_id = req.body.cliente_id;
//     }
//     // Repetir para otros campos según sea necesario
//     try {
//         const updatedPedido = await res.pedido.save();
//         res.json(updatedPedido);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // Borrar un pedido utilizando el middleware getPedido
// router.delete('/:id', getPedido, async (req, res) => {
//     try {
//         await res.pedido.remove();
//         res.json({ message: 'Pedido eliminado' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Consulta para obtener pedidos por el estado del envío
// router.get('/estado-envio/:estado', async (req, res) => {
//     try {
//         const pedidos = await Pedidos.findByEstadoEnvio(req.params.estado);
//         res.json(pedidos);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Obtener pedidos por ID de proveedor
// router.get('/proveedor/:proveedorId', async (req, res) => {
//     try {
//         const pedidos = await Pedidos.findPedidosByProveedorId(req.params.proveedorId);
//         res.json(pedidos);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Obtener un pedido por número de factura
// router.get('/numero-factura/:numeroFactura', async (req, res) => {
//     try {
//         const pedido = await Pedidos.findByNumeroFactura(req.params.numeroFactura);
//         if (!pedido) return res.status(404).json({ message: "Pedido con el número de factura proporcionado no encontrado" });
//         res.json(pedido);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Obtener pedidos por fecha de pedido
// router.get('/fecha-pedido', async (req, res) => {
//     try {
//         const fechaPedido = new Date(req.query.fecha); // Espera una fecha en el query string
//         const pedidos = await Pedidos.findPedidosByFechaPedido(fechaPedido);
//         res.json(pedidos);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Obtener pedidos por cliente ID
// router.get('/cliente/:clienteId', async (req, res) => {
//     try {
//         const pedidos = await Pedidos.findPedidosByClienteId(req.params.clienteId);
//         res.json(pedidos);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

module.exports = router;