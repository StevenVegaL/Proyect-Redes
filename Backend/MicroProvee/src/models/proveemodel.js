const { Schema, model } = require("mongoose");

const proveedorSchema = new Schema({
  _id: Number,
  nombreEmpresa: {
    type: String,
    required: true
  },
  ubicacion: {
    type: String,
    required: true
  },
  telefono: {
    type: Number,
    required: true
  },
  emailProv: {
    type: String,
    required: true
  },
  fechaSuministro: {
    type: Date,
    required: true
  },
  productos: [{
    type: Number,
    required: true
  }]
},
{ 
  collection: "Proveedor" 
});

module.exports = model("Proveedor", proveedorSchema);


