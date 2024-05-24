const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');


//
router.post('/login', userController.loginUser);

// Obtener todos los usuarios
router.get('/todos', userController.getUsers);

// //Obtener un usuario por su ID
router.get('/:id', userController.getUsuarioById);

// // Crear un nuevo usuario
router.post('/new', userController.createUsuario);

// Actualizar un usuario existente por su ID
router.patch('/update/:id', userController.updateUsuario);

// // Eliminar un usuario por su ID
router.delete('/delete/:id', userController.deleteUsuario);

module.exports = router;

