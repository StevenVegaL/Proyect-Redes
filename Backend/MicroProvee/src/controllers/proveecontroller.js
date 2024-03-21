const Proveedor = require('../models/proveemodel');

const createProveedor = async (req, res) => {
    try {
        // Buscar el último proveedor
        const lastProveedor = await Proveedor.findOne().sort({ _id: -1 });

        // Obtener el siguiente ID
        const nextId = lastProveedor ? lastProveedor._id + 1 : 1;

        // Crear un nuevo proveedor con el siguiente ID
        const newProveedor = new Proveedor({
            _id: nextId,
            ...req.body
        });

        // Guardar el nuevo proveedor
        await newProveedor.save();

        res.status(201).json({
            ok: true,
            proveedor: newProveedor
        });
    } catch (err) {
        res.status(400).json({
            ok: false,
            error: err.message
        });
    }
};


const getProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.status(200).json({
            ok: true,
            count: proveedores.length,
            proveedores
        });
    } catch (err) {
        res.status(404).json({
            ok: false,
            error: err.message
        });
    }
};


const getProveedorById = async (req, res) => {

    const id = parseInt(req.params.id);
    console.log(id)
    try {
        const proveedor = await Proveedor.findOne({ _id: id });
        console.log(proveedor)
        if (!proveedor) {
            return res.status(404).json({
                error: "El proveedor no existe"
            });
        } else {
            return res.status(200).json(proveedor);
        }
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};








const updateProveedor = async (req, res) => {
    // Convertir el ID de string a número
    const id = parseInt(req.params.id);
    
    try {
        const updatedProveedor = await Proveedor.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
        
        if (!updatedProveedor) {
            return res.status(404).json({
                ok: false,
                message: 'Proveedor no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            proveedor: updatedProveedor
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            error: err.message
        });
    }
};





const deleteProveedor = async (req, res) => {
    const id = parseInt(req.params.id);


    try {
        const deletedProveedor = await Proveedor.findOneAndDelete({ _id: id });

        if (!deletedProveedor) {
            return res.status(404).json({
                ok: false,
                message: 'Proveedor no encontrado y no pudo ser eliminado'
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Proveedor eliminado exitosamente',
            proveedor: deletedProveedor
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            error: err.message
        });
    }
};




module.exports = {
    createProveedor,
    getProveedores,
    getProveedorById,
    updateProveedor,
    deleteProveedor,
};


