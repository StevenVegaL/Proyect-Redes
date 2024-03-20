const mongoose = require('mongoose');

const detallePedidoSchema = new mongoose.Schema({
    proveedorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Proveedor'
    },
    productoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Producto'
    },
    productName: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    }
});

const pedidoSchema = new mongoose.Schema({
    clienteId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    fechaPedido: {
        type: Date,
        required: true
    },
    estadoPedido: {
        type: String,
        required: true
    },
    numeroFactura: {
        type: Number,
        required: true
    },
    fechaEnvio: {
        type: Date,
        required: false
    },
    estadoEnvio: {
        type: String,
        required: true
    },
    costePedido: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    detalles: [detallePedidoSchema]
});

module.exports = mongoose.model('Pedido', pedidoSchema);
