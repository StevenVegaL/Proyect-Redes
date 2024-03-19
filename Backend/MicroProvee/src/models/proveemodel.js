

//----------------------------------
const mongoose = require('mongoose');

const proveedorSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
});

const Proveedor = mongoose.model('Proveedor', proveedorSchema);

module.exports = Proveedor;

