const Proveedor = require('../models/proveemodel');
const mongoose = require('mongoose');

const proveedorController = {
  // Crear un nuevo proveedor
  createProveedor: async (req, res) => {
    try {
      const { nombreEmpresa, ubicacion, telefono, emailProv, fechaSuministro, producto_id } = req.body;
      const proveedor = new Proveedor({
        _id: new mongoose.Types.ObjectId(),
        nombreEmpresa,
        ubicacion,
        telefono,
        emailProv,
        fechaSuministro,
        producto_id
      });
      await proveedor.save();
      res.status(201).json(proveedor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener todos los proveedores
  getAllProveedores: async (req, res) => {
    try {
      const proveedores = await Proveedor.find().populate('producto_id');
      res.status(200).json(proveedores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Actualizar un proveedor
  updateProveedor: async (req, res) => {
    try {
      const { proveedorId } = req.params;
      const update = req.body;
      const proveedor = await Proveedor.findByIdAndUpdate(proveedorId, update, { new: true });
      res.status(200).json(proveedor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Borrar un proveedor
  deleteProveedor: async (req, res) => {
    try {
      const { proveedorId } = req.params;
      await Proveedor.findByIdAndRemove(proveedorId);
      res.status(200).json({ message: 'Proveedor deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = proveedorController;
