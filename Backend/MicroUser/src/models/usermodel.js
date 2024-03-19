const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    direccion: String,
    telefono: Number,
    email: String,
    password: String,
    userType: String,
});

// Aquí podrías incluir métodos de validación similares a validarUsuario()
usuarioSchema.methods.validarUsuario = function () {
    if (this.userType === 'cliente' && (!this.direccion || !this.telefono)) {
        throw new Error("La dirección y el teléfono son requeridos para los usuarios tipo 'cliente'");
    }
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;

