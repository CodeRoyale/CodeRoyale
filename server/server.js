const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const os = require('os');
const path = require('path');
const connectDB = require('./controllers/connectionDB');
const cors = require('cors');

const app = express();

connectDB();

const whitelist = ['http://localhost:3000', 'https://coderoyale-questionapi-develop.herokuapp.com', 'https://putquestionmaster.herokuapp.com','https://coderoyaleclient.herokuapp.com'];
const corsOptions = {
  origin: function (origin, callback) {
    // add !origin for services like postman
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      // i dont like this it logs the shit
      // -can use customErrorHandler
      callback(new Error('Not allowed by CORS.'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));


app.use(bodyParser.json());
app.use('/', require('./routes/main'));
app.use('/questions', require('./routes/question'));

const server = app.listen(process.env.PORT || 5000, () => {
  const host = os.hostname();
  console.log('Server Started at ', host, ':', server.address().port);
});

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

module.exports = {
  server,
};
