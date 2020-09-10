const express = require("express");
const router = express.Router();

const { getRoomsData } = require("../controllers/roomController");

router.get("/", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(
    `CodeRoyale Lobby Server is up and running. \n \n \n ${JSON.stringify(
      getRoomsData(),
      null,
      4
    )}`
  );
});

module.exports = router;
