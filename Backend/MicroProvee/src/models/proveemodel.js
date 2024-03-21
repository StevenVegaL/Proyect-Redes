const { Schema, model } = require("mongoose");

const proveedorSchema = new Schema({
  _id: {
    type: Number,
    required: true
  },
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
  emailProveedor: {
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
  collection: "Proveedor" // Asegúrate de que el nombre de la colección sea el correcto
});

module.exports = model("Proveedor", proveedorSchema);


