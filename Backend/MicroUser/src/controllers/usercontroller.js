const User = require('../models/usermodel');
const mongoose = require('mongoose');

const userController = {
  // Crear un nuevo usuario
  createUser: async (req, res) => {
    try {
      const { name, direccion, telefono, email, password, userType } = req.body;
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        direccion,
        telefono,
        email,
        password,
        userType
      });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener todos los usuarios
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Actualizar un usuario
  updateUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const update = req.body;
      const user = await User.findByIdAndUpdate(userId, update, { new: true });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Borrar un usuario
  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;
      await User.findByIdAndRemove(userId);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = userController;
