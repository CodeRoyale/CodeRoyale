const express = require('express');
const connectDB = require('./controllers/connectionDB');
const bodyParser = require('body-parser');


const app = express();

connectDB();

app.use(bodyParser.json());
app.use('/questions', require('./routes/question'));
const Port = process.env.PORT || 3000 ;

app.listen(Port, () => console.log('Server started'));
