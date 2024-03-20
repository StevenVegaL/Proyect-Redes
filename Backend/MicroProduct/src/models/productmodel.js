const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombreProducto: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precioVenta: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    origen: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    comentarios: [{
        comentario: String,
        fechaComment: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model('Producto', productoSchema);
