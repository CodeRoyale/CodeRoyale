const express = require('express');

const router = express.Router();

router.get('/', (req, res) =>
  res.send('CodeRoyale Question API Server is up and running')
);

module.exports = router;