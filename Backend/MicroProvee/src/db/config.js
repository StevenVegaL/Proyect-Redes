const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/sabortostado', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión a la base de datos establecida');
  } catch (error) {
    console.log(error);
    throw new Error('Error al conectar a la base de datos');
  }
};

module.exports = dbConnection;
