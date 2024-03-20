const Usuario = require('../models/usermodel'); // Asumiendo que usermodel.js exporta una clase o modelo de Mongoose

// Obtener todos los usuarios
const userget = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json({
            ok: true,
            usuarios,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            res.status(404).send("Usuario no encontrado");
        } else {
            res.status(200).json({
                ok: true,
                usuario,
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// Obtener un usuario por ID
// Crear un nuevo usuario
const createUsuario = async (req, res) => {
    try {
    // Buscar el  ultimo _id en la coleccion
    // const usuarios = await Usuario.find();
    // usuarios[-1].id
    // _id =  usuarios[-1].id + 1
        // req.body._id = 
        const usuario = new Usuario(req.body);
        console.log(usuario);
        await usuario.save();
        res.status(200).json({
            ok: true,
            usuario,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            err,
        });
    }
};

// const newHotel = async (req, res) => {
//     try {
//         let newHotel = new Hotel(req.body);
//         await newHotel.save();

//         res.status(201).json({
//             ok: true,
//             message: "Hotel creado exitosamente",
//             hotel: newHotel,
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             ok: false,
//             err,
//         });
//     }
// };

//------------------------------------------------

// const newHotel = async (req, res) => {
//     try {
//       let newHotel = new Hotel(req.body);
//       await newHotel.save();

//       res.status(201).json({
//         ok: true,
//         message: "Hotel creado exitosamente",
//         hotel: newHotel,
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({
//         ok: false,
//         err,
//       });
//     }
//   };
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
    userget,
    getUsuarioById,
    createUsuario,

};