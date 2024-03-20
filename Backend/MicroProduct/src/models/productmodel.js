const { Schema, model } = require('mongoose');

const productoSchema = new Schema({
    _id: Number,
    nombreProducto: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precioVenta: {
        type: Schema.Types.Decimal128,
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
        comentario: {
            type: String,
            required: true
        },
        fechaComment: {
            type: Date,
            default: Date.now
        }
    }]
}, { collection: 'Producto' });

module.exports = model('Producto', productoSchema);