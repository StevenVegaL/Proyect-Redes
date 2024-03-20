const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del usuario es requerido']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    }
});

// Encriptar la contraseña antes de guardar el usuario
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;


