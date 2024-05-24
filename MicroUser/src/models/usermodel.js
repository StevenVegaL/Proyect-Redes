const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    _id: Number,
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: function() { return this.userType === 'cliente'; } // Condición para requerir dirección
    },
    telefono: {
        type: Number,
        required: function() { return this.userType === 'cliente'; } // Condición para requerir teléfono
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['administrador', 'cliente'],
        required: true
    }
},
{ collection: "usuario" });

// Middleware pre-save para validaciones adicionales si es necesario
userSchema.pre('save', function(next) {
    if (this.userType === 'cliente' && (!this.direccion || !this.telefono)) {
        next(new Error('Direccion y telefono son requeridos para el userType cliente.'));
    } else {
        next();
    }
});

module.exports = model("user", userSchema);
