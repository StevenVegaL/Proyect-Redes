const express = require('express');
const router = express.Router();
const Usuario = require('./models/usermodel'); // Asumiendo que usermodel.js exporta una clase o modelo de Mongoose

// Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            res.status(404).send("Usuario no encontrado");
        } else {
            res.json(usuario);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Actualizar un usuario
exports.updateUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuario) {
            res.status(404).send("Usuario no encontrado");
        } else {
            res.json(usuario);
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) {
            res.status(404).send("Usuario no encontrado");
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).send(error);
    }
};
