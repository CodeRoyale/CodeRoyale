const mongoose = require('mongoose');
require('dotenv').config();

let URL = process.env.DATABASE_CONNECT;

if (process.env.NODE_ENV === 'test') {
  URL = process.env.TEST_DATABASE;
}

const connectDB = async () => {
  await mongoose.connect(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log('Database connected..!');
};

module.exports = connectDB;
