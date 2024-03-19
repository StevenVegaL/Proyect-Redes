const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  comment_id: Number,
  comentario: String,
  fechaComment: Date
}, { _id: false });

const productoSchema = new mongoose.Schema({
  _id: Number,
  nombreProducto: String,
  descripcion: String,
  precioVenta: Number,
  origen: String,
  stock: Number,
  proveedorId: Number,
  comentarios: [comentarioSchema]
});

module.exports = mongoose.model('Producto', productoSchema);
