const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es requerido']
    },
    precio: {
        type: Number,
        required: [true, 'El precio del producto es requerido']
    },
    descripcion: {
        type: String
    },
    categoria: {
        type: String,
        required: [true, 'La categoría del producto es requerida']
    },
    stock: {
        type: Number,
        required: [true, 'La cantidad en stock es requerida']
    },
    imagen: {
        type: String
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
