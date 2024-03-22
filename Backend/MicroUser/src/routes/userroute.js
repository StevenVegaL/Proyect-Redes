const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

// Obtener todos los usuarios
router.get('/', userController.getUsers);

// //Obtener un usuario por su ID
router.get('/:id', userController.getUsuarioById);

// // Crear un nuevo usuario
router.post('/', userController.createUsuario);

// Actualizar un usuario existente por su ID
router.patch('/:id', userController.updateUsuario);

// // Eliminar un usuario por su ID
router.delete('/:id', userController.deleteUsuario);

module.exports = router;

