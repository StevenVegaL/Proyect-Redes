const mongoose = require('mongoose');

const detalleSchema = new mongoose.Schema({
    proveedor_id: { type: Number, required: true },
    producto_id: { type: Number, required: true },
    nombreProducto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    costePedido: { type: Number, required: true }
});

const pedidosSchema = new mongoose.Schema({
    cliente_id: { type: Number, required: true },
    fechaPedido: { type: Date, required: true },
    estadoPedido: { type: String, required: true },
    numeroFactura: { type: Number, required: true },
    fechaEnvio: { type: Date, required: false }, // Puede ser opcional dependiendo de la lógica de negocio
    estadoEnvio: { type: String, required: true },
    detalle: [detalleSchema] // Array de Detalles
}, { timestamps: true }); // Agrega automáticamente campos para createdAt y updatedAt

module.exports = mongoose.model('Pedidos', pedidosSchema);

