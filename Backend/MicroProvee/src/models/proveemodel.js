const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
  _id: Number,
  nombreEmpresa: String,
  ubicacion: String,
  telefono: Number,
  emailProveedor: String,
  fechaSuministro: Date,
  productos: [String] // Suponiendo que son IDs de productos representados como strings
});

module.exports = mongoose.model('Proveedor', proveedorSchema);

