const mongoose = require('mongoose');

// Esquema para la clase interna 'Detalle', que refleja la estructura interna de 'Detalle' en Java
const detalleSchema = new mongoose.Schema({
  proveedor_id: { type: Number, required: true }, // Asumiendo que los IDs son numéricos; ajustar si es necesario
  producto_id: { type: Number, required: true },
  nombreProducto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  costePedido: { type: Number, required: true }
});

// Esquema para 'Pedidos', incluyendo un array de 'Detalle' conforme a la definición en Java
const pedidoSchema = new mongoose.Schema({
  cliente_id: { type: Number, required: true }, // Este campo podría requerir ser un ObjectId o similar, dependiendo de tu diseño de base de datos
  fechaPedido: { type: Date, required: true },
  estadoPedido: { type: String, required: true },
  numeroFactura: { type: Number, required: true },
  fechaEnvio: { type: Date, required: true },
  estadoEnvio: { type: String, required: true },
  detalle: [detalleSchema] // Incorpora el esquema 'Detalle' como un arreglo, permitiendo múltiples entradas de detalles por pedido
}, { collection: 'Pedidos' }); // Especifica la colección de MongoDB a la que pertenece este esquema

module.exports = mongoose.model('Pedido', pedidoSchema);
