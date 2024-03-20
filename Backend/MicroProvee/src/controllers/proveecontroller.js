const Proveedor = require('../models/proveemodel'); // Asegúrate de que la ruta sea correcta

// Obtener todos los proveedores
exports.getAllProveedores = async (req, res, next) => {
    try {
        const proveedores = await Proveedor.find();
        res.json(proveedores);
    } catch (err) {
        next(err);
    }
};

// Obtener un proveedor por ID
exports.getProveedorById = async (req, res, next) => {
    try {
        const proveedor = await Proveedor.findById(req.params.id);
        if (!proveedor) {
            res.status(404).json({ message: "Proveedor no encontrado" });
        } else {
            res.json(proveedor);
        }
    } catch (err) {
        next(err);
    }
};

// Crear un nuevo proveedor
exports.createProveedor = async (req, res, next) => {
    const proveedor = new Proveedor(req.body);
    try {
        const nuevoProveedor = await proveedor.save();
        res.status(201).json(nuevoProveedor);
    } catch (err) {
        next(err);
    }
};

// Actualizar un proveedor
exports.updateProveedor = async (req, res, next) => {
    try {
        const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!proveedor) {
            res.status(404).json({ message: "Proveedor no encontrado" });
        } else {
            res.json(proveedor);
        }
    } catch (err) {
        next(err);
    }
};

// Eliminar un proveedor
exports.deleteProveedor = async (req, res, next) => {
    try {
        const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
        if (!proveedor) {
            res.status(404).json({ message: "Proveedor no encontrado" });
        } else {
            res.status(204).send();
        }
    } catch (err) {
        next(err);
    }
};

