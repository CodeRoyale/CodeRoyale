//basic setting up
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const PORT = process.env.PORT || 2500;

//importing packages
const express = require("express");
const os = require("os");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const { authUser } = require("./utils/auth");
const { CONNECTION_ACK } = require("./socketActions/serverActions");
const { createRoom } = require("../server/controllers/roomController");

//remove all this stupidity from here and port these to the new server
//crearte server using http
//we need to use http here for socket.io

//-add origin in options
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin":
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://codeRoyale.herokuapp.com", //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true,
    };
    res.writeHead(200, headers);
    res.end();
  },
});

try {
  io.use(authUser).on("connection", (socket) => {
    let userDetails = socket.userDetails;
    let config = { admin: userDetails.userName };
    createRoom(config);
  });
} catch (err) {
  console.log(err.message);
}
var whitelist = ["http://localhost:3000", "https://codeRoyale.herokuapp.com"];
var corsOptions = {
  origin: function (origin, callback) {
    //the !origin is for services like postman

    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      //i dont like this it prints the shit
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

//Routes
app.use("/", require("./routes/main"));
app.use("/users", require("./routes/users"));
app.use("/rooms", require("./routes/rooms"));

//start listening
server.listen(PORT, () => {
  console.log(`Loby Server running at - ${os.hostname()} on PORT : ${PORT}`);
});

module.exports = {
  server,
};
