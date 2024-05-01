const axios = require('axios');
const Pedido = require('../models/pedidoModel');

// Configurar clientes API directamente aquí
const userClient = axios.create({
    baseURL: 'http://localhost:3008/api/users', // Asegúrate de ajustar la URL según tu configuración
    timeout: 5000,
});

const productClient = axios.create({
    baseURL: 'http://localhost:3009/api/productos', // Asegúrate de ajustar la URL según tu configuración
    timeout: 5000,
});



const createPedido = async (req, res) => {
    const { userId, detalles } = req.body;

    try {
        // Verificación de la existencia del usuario
        const usuarioRespuesta = await userClient.get(`/${userId}`);
        if (!usuarioRespuesta.data.ok) {
            return res.status(404).json({
                ok: false,
                error: "Usuario no encontrado"
            });
        }

        // Verificación del stock de los productos
        const erroresDeStock = [];
        await Promise.all(detalles.map(async detalle => {
            const productoRespuesta = await productClient.get(`/${detalle.productId}`);
            if (!productoRespuesta.data.ok || productoRespuesta.data.producto.stock < detalle.cantidad) {
                erroresDeStock.push(`Producto ${detalle.productId} no disponible o stock insuficiente`);
            }
        }));

        if (erroresDeStock.length > 0) {
            return res.status(400).json({
                ok: false,
                error: erroresDeStock.join(", ")
            });
        }

        // Creación del pedido si todas las verificaciones son correctas
        const nuevoPedido = new Pedido({
            usuario: userId,
            detalles,
            estado: "Pendiente",
            fechaCreacion: new Date()
        });
        await nuevoPedido.save();

        // Actualización del stock después de crear el pedido
        detalles.forEach(async detalle => {
            await productClient.patch(`/${detalle.productId}`, {
                $inc: { stock: -detalle.cantidad }
            });
        });

        res.status(201).json({
            ok: true,
            pedido: nuevoPedido
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        });
    }
};






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




const updatePedido = async (req, res) => {
    const { id } = req.params;
    const { detalles } = req.body;

    try {
        const pedido = await Pedido.findById(id);
        if (!pedido) {
            return res.status(404).json({ok: false, error: 'Pedido no encontrado'});
        }

        // Verificar existencia y stock de productos antes de actualizar el pedido
        await Promise.all(detalles.map(async detalle => {
            const response = await productClient.get(`/${detalle.productId}`);
            if (!response.data.ok || response.data.producto.stock < detalle.cantidad) {
                throw new Error(`Producto ${detalle.productId} no disponible o stock insuficiente`);
            }
        }));

        // Actualizar el pedido
        const pedidoActualizado = await Pedido.findByIdAndUpdate(id, { detalles }, { new: true });
        if (!pedidoActualizado) {
            return res.status(500).json({ok: false, error: 'Error al actualizar el pedido'});
        }

        // Actualizar el stock de los productos
        detalles.forEach(async detalle => {
            await productClient.patch(`/${detalle.productId}`, {
                stock: -(detalle.cantidad - (pedido.detalles.find(p => p.productId === detalle.productId)?.cantidad || 0))
            });
        });

        res.status(200).json({ok: true, pedido: pedidoActualizado});
    } catch (error) {
        res.status(500).json({ok: false, error: error.message});
    }
};




const deletePedido = async (req, res) => {
    const { id } = req.params;

    try {
        const pedido = await Pedido.findById(id);
        if (!pedido) {
            return res.status(404).json({ ok: false, error: 'Pedido no encontrado' });
        }

        // Opcional: Revertir el stock de los productos
        pedido.detalles.forEach(async detalle => {
            await productClient.patch(`/${detalle.productId}`, {
                $inc: { stock: detalle.cantidad }
            });
        });

        // Eliminar el pedido
        await Pedido.findByIdAndDelete(id);
        res.status(200).json({ ok: true, message: 'Pedido eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
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








module.exports = {

    getAllPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido,
    getPedidosPorEstadoEnvio,
    getPedidoPorNumeroFactura,
    
   
};


