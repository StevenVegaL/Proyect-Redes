
const Proveedor = require('../models/proveemodel');

exports.createProveedor = async (req, res) => {
    try {
        const newProveedor = await Proveedor.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                proveedor: newProveedor
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.status(200).json({
            status: 'success',
            results: proveedores.length,
            data: {
                proveedores
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findById(req.params.id);
        if (!proveedor) {
            return res.status(404).json({
                status: 'fail',
                message: 'Proveedor not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                proveedor
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Proveedor not found'
        });
    }
};

exports.updateProveedor = async (req, res) => {
    try {
        const updatedProveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedProveedor) {
            return res.status(404).json({
                status: 'fail',
                message: 'Proveedor not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                proveedor: updatedProveedor
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.deleteProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
        if (!proveedor) {
            return res.status(404).json({
                status: 'fail',
                message: 'Proveedor not found'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

