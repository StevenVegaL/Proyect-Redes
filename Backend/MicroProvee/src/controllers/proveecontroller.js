const Proveedor = require('../models/proveemodel'); // Asegúrate de que la ruta sea correcta
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.json(proveedores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    res.json(proveedor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const proveedor = new Proveedor({
    _id: req.body._id,
    nombreEmpresa: req.body.nombreEmpresa,
    ubicacion: req.body.ubicacion,
    telefono: req.body.telefono,
    emailProveedor: req.body.emailProveedor,
    fechaSuministro: req.body.fechaSuministro,
    productos: req.body.productos
  });

  try {
    const nuevoProveedor = await proveedor.save();
    res.status(201).json(nuevoProveedor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    // Actualiza el proveedor con los datos enviados en req.body
    // Ejemplo: proveedor.nombreEmpresa = req.body.nombreEmpresa || proveedor.nombreEmpresa;
    // Repite para los demás campos
    await proveedor.save();
    res.json(proveedor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Proveedor.findByIdAndDelete(req.params.id);
    res.json({ message: "Proveedor eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

