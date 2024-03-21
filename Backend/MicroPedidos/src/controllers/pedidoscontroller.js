const Pedido = require('../models/pedidosmodels'); // Asegúrate de que la ruta al modelo es correcta

const getAllPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        res.status(200).json({
            ok: true,
            pedidos,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

// const getPedidoById = async (req, res) => {
//     try {
//         const pedido = await Pedido.findById(req.params.id);
//         if (!pedido) {
//             res.status(404).send("Pedido no encontrado");
//         } else {
//             res.status(200).json({
//                 ok: true,
//                 pedido,
//             });
//         }
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// const createPedido = async (req, res) => {
//     try {
//         const nuevoPedido = new Pedido(req.body);
//         await nuevoPedido.save();
//         res.status(201).json({
//             ok: true,
//             pedido: nuevoPedido,
//         });
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };

// const updatePedido = async (req, res) => {
//     try {
//         const pedidoActualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!pedidoActualizado) {
//             res.status(404).send("Pedido no encontrado para actualizar");
//         } else {
//             res.status(200).json({
//                 ok: true,
//                 pedido: pedidoActualizado,
//             });
//         }
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };

// const deletePedido = async (req, res) => {
//     try {
//         const pedidoEliminado = await Pedido.findByIdAndDelete(req.params.id);
//         if (!pedidoEliminado) {
//             res.status(404).send("Pedido no encontrado para eliminar");
//         } else {
//             res.status(200).json({
//                 ok: true,
//                 mensaje: "Pedido eliminado",
//             });
//         }
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// const getPedidosPorEstadoEnvio = async (req, res) => {
//     try {
//         const pedidos = await Pedido.find({ estadoEnvio: req.params.estado });
//         res.status(200).json({
//             ok: true,
//             pedidos,
//         });
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// const getPedidoPorNumeroFactura = async (req, res) => {
//     try {
//         const pedido = await Pedido.findOne({ numeroFactura: req.params.numeroFactura });
//         if (!pedido) {
//             res.status(404).send("Pedido con el número de factura proporcionado no encontrado");
//         } else {
//             res.status(200).json({
//                 ok: true,
//                 pedido,
//             });
//         }
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// const getPedidosPorCliente = async (req, res) => {
//     try {
//         const pedidos = await Pedido.find({ clienteId: req.params.clienteId });
//         res.status(200).json({
//             ok: true,
//             pedidos,
//         });
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };


module.exports = {
    getAllPedidos,
    // getPedidoById,
    // createPedido,
    // updatePedido,
    // deletePedido,
    // getPedidosPorEstadoEnvio,
    // getPedidoPorNumeroFactura,
    // getPedidosPorCliente,
    // getVentasEnDia,
};
