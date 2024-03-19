
//--------------------------

const Proveedor = require('../models/proveemodel');

// Obtener todos los proveedores
const obtenerProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Agregar un nuevo proveedor
const agregarProveedor = async (req, res) => {
  const proveedor = new Proveedor(req.body);
  try {
    const nuevoProveedor = await proveedor.save();
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  obtenerProveedores,
  agregarProveedor,
};
