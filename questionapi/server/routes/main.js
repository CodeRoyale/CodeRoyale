const express = require('express');

const route = express.Router();

route.get('/', (req, res) =>
  res.send('CodeRoyale Question API Server is up and running')
);

module.exports = route;
