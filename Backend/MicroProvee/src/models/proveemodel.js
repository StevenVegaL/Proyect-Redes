const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del proveedor es requerido']
  },
  direccion: {
    type: String,
    required: [true, 'La dirección del proveedor es requerida']
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono del proveedor es requerido']
  }
});

const Proveedor = mongoose.model('Proveedor', proveedorSchema);

module.exports = Proveedor;
