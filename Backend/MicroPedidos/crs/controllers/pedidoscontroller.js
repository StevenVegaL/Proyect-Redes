const express = require('express');
const router = express.Router();
const Pedidos = require('../models/pedidosmodels'); // Asegúrate de ajustar la ruta al archivo de modelo

// Obtener todos los pedidos
router.get('/', async (req, res) => {
    try {
        const pedidos = await Pedidos.find();
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener un pedido por ID
router.get('/:id', getPedido, (req, res) => {
    res.json(res.pedido);
});

// Crear un nuevo pedido
router.post('/', async (req, res) => {
    const pedido = new Pedidos(req.body);
    try {
        const nuevoPedido = await pedido.save();
        res.status(201).json(nuevoPedido);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Actualizar un pedido
router.put('/:id', getPedido, async (req, res) => {
    if (req.body.cliente_id != null) {
        res.pedido.cliente_id = req.body.cliente_id;
    }
    // Repetir para otros campos...
    try {
        const updatedPedido = await res.pedido.save();
        res.json(updatedPedido);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Borrar un pedido
router.delete('/:id', getPedido, async (req, res) => {
    try {
        await res.pedido.remove();
        res.json({ message: 'Pedido eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Consulta para obtener pedidos por el estado del envío
router.get('/estado-envio/:estado', async (req, res) => {
    try {
        const pedidos = await Pedidos.find({ estadoEnvio: req.params.estado });
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware para obtener un pedido por ID
async function getPedido(req, res, next) {
    let pedido;
    try {
        pedido = await Pedidos.findById(req.params.id);
        if (pedido == null) {
            return res.status(404).json({ message: 'No se puede encontrar el pedido' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.pedido = pedido;
    next();
}

module.exports = router;
