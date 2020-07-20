const mongoose = require('mongoose');

const URL = "mongodb+srv://dbroyale:dbroyale@cluster0.c9qtb.mongodb.net/dbroyale?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(URL, {
        useUnifiedTopology: true, 
        useNewUrlParser: true
    });
    console.log('Database connected..!');
}

module.exports = connectDB;