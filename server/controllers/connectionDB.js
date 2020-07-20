const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.DATABASE_CONNECT;

const connectDB = async () => {
    await mongoose.connect(URL, {
        useUnifiedTopology: true, 
        useNewUrlParser: true
    });
    console.log('Database connected..!');
}

module.exports = connectDB;