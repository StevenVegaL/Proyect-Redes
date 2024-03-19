const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

// Rutas para el manejo de usuarios
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
