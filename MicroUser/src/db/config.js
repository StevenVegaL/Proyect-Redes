const mongoose = require('mongoose');

const DB_URI = 'mongodb://mongodb:27017/tostado_db';

const connectDB = async () => {
    try {
        mongoose.connect(DB_URI, {
            autoIndex: true
        })

        console.log('DB Online')
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
};




module.exports = { connectDB }