const express = require('express');

const router = express.Router();

router.get('/', (req, res) =>
  res.send('CodeRoyale API Server is up and running')
);

module.exports = router;
