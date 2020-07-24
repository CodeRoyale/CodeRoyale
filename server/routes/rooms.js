const express = require("express");
const router = express.Router();

const { getRoomData } = require("../controllers/roomController");

router.get("/", (req, res) =>
  res.send(
    `CodeRoyae Lobby Server is up and running. ${JSON.stringify(getRoomData())}`
  )
);

module.exports = router;
