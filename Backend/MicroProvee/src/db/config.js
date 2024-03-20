const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/sabortostado';

exports.connectDB = async () => {
    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Database connection successful');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
};

