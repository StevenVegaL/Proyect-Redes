const Usuario = require('../models/usermodel'); // Asumiendo que usermodel.js exporta una clase o modelo de Mongoose

// Obtener todos los usuarios
// const userget = async (req, res) => {
//     try {
//         const usuarios = await Usuario.find();
//         res.status(200).json({
//             ok: true,
//             usuarios,
//         });
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };


// Obtener un usuario por ID
// const getUsuarioById = async (req, res) => {
//     try {
//         const usuario = await Usuario.findById(req.params.id);
//         if (!usuario) {
//             res.status(404).send("Usuario no encontrado");
//         } else {
//             res.status(200).json({
//                 ok: true,
//                 usuario,
//             });
//         }
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };




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











// // Actualizar un usuario
// exports.updateUsuario = async (req, res) => {
//     try {
//         const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!usuario) {
//             res.status(404).send("Usuario no encontrado");
//         } else {
//             res.json(usuario);
//         }
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };

// // Eliminar un usuario
// exports.deleteUsuario = async (req, res) => {
//     try {
//         const usuario = await Usuario.findByIdAndDelete(req.params.id);
//         if (!usuario) {
//             res.status(404).send("Usuario no encontrado");
//         } else {
//             res.status(204).send();
//         }
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };


module.exports = {
    // userget,
    // getUsuarioById,
    createUsuario,

};