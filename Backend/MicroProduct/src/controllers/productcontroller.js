const Product = require('../models/productmodel');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            ok: true,
            count: products.length,
            products
        });
    } catch (err) {
        res.status(404).json({
            ok: false,
            error: err.message
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({
                ok: false,
                message: 'Product not found'
            });
        } else {
            res.status(200).json({
                ok: true,
                product
            });
        }
    } catch (err) {
        res.status(404).json({
            ok: false,
            error: err.message
        });
    }
};


const createProduct = async (req, res) => {
    try {
        // Buscar el último producto
        const lastProduct = await Product.findOne().sort({ _id: -1 });

        // Obtener el siguiente ID
        const nextId = lastProduct ? lastProduct._id + 1 : 1;

        // Crear un nuevo producto con el siguiente ID
        const newProduct = new Product({
            _id: nextId,
            ...req.body
        });

        // Guardar el nuevo producto
        await newProduct.save();

        res.status(201).json({
            ok: true,
            product: newProduct
        });
    } catch (err) {
        res.status(400).json({
            ok: false,
            error: err.message
        });
    }
};


const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) {
            res.status(404).json({
                ok: false,
                message: 'Product not found'
            });
        } else {
            res.status(200).json({
                ok: true,
                product: updatedProduct
            });
        }
    } catch (err) {
        res.status(404).json({
            ok: false,
            error: err.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(204).json({
            ok: true,
            message: 'Product successfully deleted'
        });
    } catch (err) {
        res.status(404).json({
            ok: false,
            error: err.message
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
