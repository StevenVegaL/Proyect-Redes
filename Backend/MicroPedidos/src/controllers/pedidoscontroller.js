const Pedido = require('../models/pedidosmodels'); // Asegúrate de que la ruta al modelo es correcta

// Obtener todos los pedidos
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


// // Obtener un pedido por su ID
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





// // Crear un nuevo pedido
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



// // Actualizar un pedido existente por su ID
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


// // Eliminar un pedido por su ID
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





// // Obtener pedidos por estado de envío
const getPedidosPorEstadoEnvio = async (req, res) => {
    try {
        const pedidos = await Pedido.find({ estadoEnvio: req.params.estado });

        if (pedidos.length === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No se encontraron pedidos con ese estado de envío'
            });
        }

        res.status(200).json({
            ok: true,
            pedidos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        });
    }
};



 // Obtener un pedido por número de factura

const getPedidoPorNumeroFactura = async (req, res) => {
    // Convertir el número de factura de string a número
    const numeroFactura = parseInt(req.params.numeroFactura);
    try {
        const pedido = await Pedido.findOne({ numeroFactura: numeroFactura });

        if (!pedido) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Pedido con el número de factura proporcionado no encontrado'
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





const getPedidosPorCliente = async (req, res) => {
    // Convertir el clienteId de string a número
    const clienteId = parseInt(req.params.clienteId);
    try {
        const pedidos = await Pedido.find({ clienteId: clienteId });

        if (pedidos.length === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No se encontraron pedidos para el cliente con el ID proporcionado'
            });
        }

        res.status(200).json({
            ok: true,
            pedidos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        });
    }
};





module.exports = {

    getAllPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido,
    getPedidosPorEstadoEnvio,
    getPedidoPorNumeroFactura,
    getPedidosPorCliente,
   
};


