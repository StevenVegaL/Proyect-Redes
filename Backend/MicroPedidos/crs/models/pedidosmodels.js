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

// Métodos estáticos para operaciones de consulta
pedidosSchema.statics.findPedidosByProveedorId = function (proveedorId) {
    return this.find({ "detalle.proveedor_id": proveedorId });
};

pedidosSchema.statics.findByEstadoEnvio = function (estadoEnvio) {
    return this.find({ estadoEnvio: estadoEnvio });
};

pedidosSchema.statics.findByNumeroFactura = function (numeroFactura) {
    return this.findOne({ numeroFactura: numeroFactura });
};

pedidosSchema.statics.findPedidosByFechaPedido = function (fechaPedido) {
    return this.find({ fechaPedido: { $eq: fechaPedido } });
};

pedidosSchema.statics.findPedidosByClienteId = function (clienteId) {
    return this.find({ cliente_id: clienteId });
};

module.exports = mongoose.model('Pedidos', pedidosSchema);