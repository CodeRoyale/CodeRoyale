const express = require("express");
const router = express.Router();

const { getRoomsData } = require("../controllers/roomController");

router.get("/", (req, res) => {
  const rooms = getRoomsData();

  Object.entries(rooms).forEach((ele) => {
    ele[1].competition.stopTimer = "stoper function";
  });

  res.header("Content-Type", "application/json");
  res.send(
    `CodeRoyale Lobby Server is up and running. \n \n \n ${JSON.stringify(
      rooms,
      null,
      4
    )}`
  );
});

module.exports = router;

// thanks alan for testing
