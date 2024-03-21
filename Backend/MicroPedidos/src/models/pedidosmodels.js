const { Schema, model } = require('mongoose');

const detallePedidoSchema = new Schema({
    proveedor_id: {
        type: Number, // Cambiado de ObjectId a Number
        required: true
    },
    producto_id: {
        type: Number, // Cambiado de ObjectId a Number
        required: true
    },
    nombreProducto: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    costePedido: {
        type: Number, // Añadido, asegúrate de que este campo sea correcto
        required: true
    }
});

const pedidoSchema = new Schema({
    cliente_id: {
        type: Number, // Cambiado de ObjectId a Number
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
    detalles: [detallePedidoSchema] // Cambiado el nombre del campo a 'detalles'
}, { collection: 'pedidos' });

module.exports = model('Pedido', pedidoSchema);

