const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombreEmpresa: {
    type: String,
    required: true
  },
  ubicacion: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  emailProv: {
    type: String,
    required: true,
    unique: true
  },
  fechaSuministro: {
    type: Date,
    required: true
  },
  producto_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Producto' // Asume que hay un modelo 'Producto'
  }
});

module.exports = mongoose.model('Proveedor', proveedorSchema);
