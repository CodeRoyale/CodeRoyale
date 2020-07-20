const express = require('express');
const connectDB = require('./controllers/connectionDB');
const bodyParser = require('body-parser');


const app = express();

connectDB();

app.use(bodyParser.json());
app.use('/questions', require('./routes/question'));
const PORT = process.env.PORT || 3000 ;

app.listen(PORT, () => console.log('Server started'));
