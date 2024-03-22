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



const getPedidoById = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const pedido = await Pedido.findOne({ _id: id });

        if (!pedido) {
            return res.status(404).json({
                ok: false,
                error: 'Pedido no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            pedido
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        });
    }
};






const createPedido = async (req, res) => {
    try {
        // Buscar el último pedido
        const lastPedido = await Pedido.findOne().sort({ _id: -1 });

        // Obtener el siguiente ID
        const nextId = lastPedido ? lastPedido._id + 1 : 1;

        // Crear un nuevo pedido con el siguiente ID
        const nuevoPedido = new Pedido({
            _id: nextId,
            ...req.body
        });

        // Guardar el nuevo pedido
        await nuevoPedido.save();

        res.status(201).json({
            ok: true,
            pedido: nuevoPedido
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            error: error.message
        });
    }
};




const updatePedido = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const pedidoActualizado = await Pedido.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });

        if (!pedidoActualizado) {
            return res.status(404).json({
                ok: false,
                error: 'Pedido no encontrado para actualizar'
            });
        }
        res.status(200).json({
            ok: true,
            pedido: pedidoActualizado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        });
    }
};


const deletePedido = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const pedidoEliminado = await Pedido.findOneAndDelete({ _id: id });

        if (!pedidoEliminado) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Pedido no encontrado para eliminar'
            });
        }
        res.status(200).json({
            ok: true,
            mensaje: 'Pedido eliminado',
            pedido: pedidoEliminado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        });
    }
};







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
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido,
    // getPedidosPorEstadoEnvio,
    // getPedidoPorNumeroFactura,
    // getPedidosPorCliente,
    // getVentasEnDia,
};


