const Usuario = require('../models/usermodel'); // Asumiendo que usermodel.js exporta una clase o modelo de Mongoose

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json({
            ok: true,
            count: usuarios.length,
            usuarios
        });
    } catch (err) {
        res.status(404).json({
            ok: false,
            error: err.message
        });
    }
};




const getUsuarioById = async (req, res) => {
    // Convertir el ID de string a número
    const id = parseInt(req.params.id);
    try {
        // Usar findOne en lugar de findById
        const usuario = await Usuario.findOne({ _id: id });
        
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                error: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            usuario
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: error.message
        });
    }
};





// Crear un nuevo usuario

const createUsuario = async (req, res) => {
    try {
        // Buscar el último usuario
        const lastUsuario = await Usuario.findOne().sort({ _id: -1 });

        // Obtener el siguiente ID
        const nextId = lastUsuario ? lastUsuario._id + 1 : 1;

        // Crear un nuevo usuario con el siguiente ID
        const newUsuario = new Usuario({
            _id: nextId,
            ...req.body
        });

        // Guardar el nuevo usuario
        await newUsuario.save();

        res.status(201).json({
            ok: true,
            usuario: newUsuario
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            error: err.message
        });
    }
};







const updateUsuario = async (req, res) => {
    // Convertir el ID de string a número
    const id = parseInt(req.params.id);

    try {
        // Usar findOneAndUpdate con el ID numérico
        const updatedUsuario = await Usuario.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
        
        if (!updatedUsuario) {
            return res.status(404).json({
                ok: false,
                error: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            usuario: updatedUsuario
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            error: err.message
        });
    }
};




const deleteUsuario = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deletedUsuario = await Usuario.findOneAndDelete({ _id: id });

        if (!deletedUsuario) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado y no pudo ser eliminado'
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Usuario eliminado exitosamente',
            usuario: deletedUsuario
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            error: err.message
        });
    }
};



module.exports = {
    getUsers,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario

};