const { Schema, model } = require('mongoose');

const detallePedidoSchema = new Schema({
    proveedorId: {
        type: Schema.Types.ObjectId,
        ref: 'Proveedor',
        required: true
    },
    productoId: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
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

const pedidoSchema = new Schema({
    clienteId: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
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
        type: Date
    },
    estadoEnvio: {
        type: String,
        required: true
    },
    costePedido: {
        type: Schema.Types.Decimal128,
        required: true
    },
    detalles: [detallePedidoSchema]
}, { collection: 'pedidos' });

module.exports = model('Pedido', pedidoSchema);
