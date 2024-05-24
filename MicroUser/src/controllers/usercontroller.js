const Usuario = require('../models/usermodel'); // Asumiendo que usermodel.js exporta una clase o modelo de Mongoose



const loginUser = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ email: email });

        if (!usuario) {
            return res.status(401).json({
                error: "El usuario no existe"
            });
        }


        const passMatch = usuario.password == password
        if (!passMatch) {
            return res.status(401).json({
                error: "Contraseña incorrecta"

            });
        }

        res.status(200).json({
            ok: true,
            usuario
        });
    } catch (err) {
        res.status(404).json({
            ok: false,
            error: err.message
        });
    }
};



// Crear un nuevo usuario

const createUsuario = async (req, res) => {
    try {
        console.log(req.body)

        // Buscar el último usuario
        const lastUsuario = await Usuario.findOne().sort({ _id: -1 });

        // Obtener el siguiente ID
        const nextId = lastUsuario ? lastUsuario._id + 1 : 1;

        // Crear un nuevo usuario con el siguiente ID
        const newUsuario = new Usuario({
            _id: nextId,
            ...req.body
        });
        console.log('Nuevo usuario creado:', newUsuario);

        // Guardar el nuevo usuario
        await newUsuario.save();

        const response = res.status(201).json({
            ok: true,
            usuario: newUsuario
        });
    } catch (error) {
        console.error('Error inserting user:', error);
        if (error.code === 121) {
            console.error('Validation Error Details:', JSON.stringify(error.errInfo.details, null, 2));
        }
        res.status(500).send({ error: 'Internal Server Error', details: error.message });
    }
};


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
    loginUser,
    getUsers,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario

};