const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/SaborTostado';

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