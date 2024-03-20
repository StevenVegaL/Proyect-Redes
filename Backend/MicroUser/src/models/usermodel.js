const { Schema, model } = require("mongoose");


const userSchema = new Schema({
    _id: Number,
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},
    { collection: "usuario" }
);





module.exports = model("user", userSchema);

//_-----------------------


