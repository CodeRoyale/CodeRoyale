const express = require("express");
const router = express.Router();

const { getUserData } = require("../controllers/userController");

router.get("/", (req, res) =>
  res.send(
    `CodeRoyae Lobby Server is up and running. ${JSON.stringify(getUserData())}`
  )
);

module.exports = router;
