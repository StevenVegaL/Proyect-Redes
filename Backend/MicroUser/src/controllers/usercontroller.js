const express = require('express');
const router = express.Router();
const UsuarioService = require('../services/UsuarioService');

// Get all usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await UsuarioService.getAllUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get usuario by ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await UsuarioService.getUsuarioById(req.params.id);
    res.json(usuario);
  } catch (error) {
    res.status(404).send(error);
  }
});

// Create a new usuario
router.post('/', async (req, res) => {
  try {
    const newUsuario = await UsuarioService.createUsuario(req.body);
    res.status(201).json(newUsuario);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a usuario
router.put('/:id', async (req, res) => {
  try {
    const updatedUsuario = await UsuarioService.updateUsuario(req.params.id, req.body);
    res.json(updatedUsuario);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a usuario
router.delete('/:id', async (req, res) => {
  try {
    await UsuarioService.deleteUsuario(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
