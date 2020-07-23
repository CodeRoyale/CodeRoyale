const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const connectDB = require('./controllers/connectionDB');

const app = express();

connectDB();

app.use(bodyParser.json());
app.use('/questions', require('./routes/question'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server started'));

// parameter for swaggerJSDoc to render the json for redoc
const options = {
  definition: {
    components: {},
    openapi: '3.0.0',
    info: {
      title: 'CodeRoyale API Documentation',
      version: 'v1.0.0',
      description:
        '<h3>Introduction</h3> <br/>The goal of CodeRoyale is to create Competitive Programming platform where users can have coding battle with friends, random users and team battles to show case your DSA skills.<hr/>',
    },
  },
  // Path to the files where API documentations are written
  apis: [path.resolve(__dirname, '../_docs/*.js')],
};

// passing option as a parameter to swaggerJSDoc
const swaggerSpec = swaggerJSDoc(options);

// request for getting the json file rendered by swaggerJSDocs
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// request for seeing the api-documentation live
app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'redoc.html'));
});
