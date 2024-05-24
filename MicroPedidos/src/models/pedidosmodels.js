const { Schema, model } = require('mongoose');

const detalleSchema = new Schema({
    proveedor_id: {
        type: Number,
        required: true
    },
    producto_id: {
        type: Number,
        required: true
    },
    nombreProducto: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
        min: 1 // Asegura que la cantidad sea al menos 1
    },
    costePedido: {
        type: Number,
        required: true,
        min: 1 // Asegura que el coste sea al menos 1
    }
}, { _id: false }); // _id: false si no queremos que Mongoose añada _id a los subdocumentos

const pedidoSchema = new Schema({
    _id: Number,
    cliente_id: {
        type: Number,
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
        type: Date,
        required: true
    },
    estadoEnvio: {
        type: String,
        required: true
    },
    detalle: [detalleSchema] // Aquí usamos el esquema de detalle que definimos arriba
}, { collection: 'Pedidos' });

module.exports = model('Pedidos', pedidoSchema);
