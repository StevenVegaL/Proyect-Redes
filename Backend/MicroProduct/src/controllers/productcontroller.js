const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Producto = require('../models/productmodel'); // Asegúrate de que la ruta al modelo sea correcta

mongoose.connect('tu_cadena_de_conexion_a_mongodb', { useNewUrlParser: true, useUnifiedTopology: true });

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            res.status(404).send('Producto no encontrado');
        } else {
            res.json(producto);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        const newProducto = new Producto(req.body);
        const savedProducto = await newProducto.save();
        res.status(201).json(savedProducto);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
    try {
        const updatedProducto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProducto);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.status(204).send('Producto eliminado');
    } catch (error) {
        res.status(500).send(error);
    }
});

// Encontrar productos con stock bajo
router.get('/stock-bajo', async (req, res) => {
    try {
        const umbral = req.query.umbral || 130; // Valor por defecto
        const productos = await Producto.find({ stock: { $lt: umbral } });
        res.json(productos);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Obtener productos con comentarios recientes
router.get('/comentarios-recientes', async (req, res) => {
    try {
        const fecha = new Date(req.query.fecha);
        const productos = await Producto.find({ "comentarios.fechaComment": { $gt: fecha } });
        res.json(productos);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
