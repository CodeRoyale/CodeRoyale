//basic setting up
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const PORT = process.env.PORT || 2500;

//importing packages
const express = require("express");
const os = require("os");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const { checkToken } = require("./utils/auth");

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
          : "https://kite-chat.herokuapp.com", //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true,
    };
    res.writeHead(200, headers);
    res.end();
  },
});

try {
  io.use(checkToken).on("connection", (socket) => {
    const { userName } = socket.handshake.headers;
    //if user is not already connected
    try {
      addUser({ userName, socketId: socket.id });
      socket.emit("connected", "User authorized and connected");
      socket["_friendList"] = [];
    } catch (err) {
      socket.emit("disconnected", err.message);
      socket.disconnect();
    }

    socket.on("onlineFriendList", (friendList, cb) => {
      //notify all friends here
      //this method could be way better
      let onlineFriends = getOnline(friendList);

      //storing the friends list associated with each socket
      socket["_friendList"] = friendList;
      //notifyAll
      console.log(friendList);
      onlineFriends.forEach((friend) => {
        console.log(" conn ", userName, " tel ", friend);
        io.to(getSocketID(friend)).emit("friendConnected", { userName });
      });
      cb({ onlineFriends });
    });

    //client1 --> server --> client2
    socket.on("SEND_MESSAGE", ({ sender, receiver, content }, cb) => {
      let socketId = getSocketID(receiver);
      if (socketId) {
        io.to(socketId).emit("RECV_MESSAGE", { sender, content });
      }
    });

    socket.on("disconnect", () => {
      //notifyFriends about this
      //notifyAll
      socket["_friendList"].forEach((friend) => {
        console.log(" dis ", userName, " tel ", friend);
        io.to(getSocketID(friend)).emit("friendDisconnected", {
          userName,
        });
      });
      removeUser(userName);
    });

    //friend request
    socket.on("UPDATE_USER_DETAIL", ({ sender, receiver }) => {
      let socketId = getSocketID(receiver);
      if (socketId) {
        io.to(socketId).emit("UPDATE_USER_DETAIL", { sender });
      }
    });
  });
} catch (err) {
  console.log(err.message);
}
var whitelist = ["http://localhost:3000", "https://kite-chat.herokuapp.com"];
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

//start listening
server.listen(PORT, () => {
  console.log(`Chat Server running at - ${os.hostname()} on PORT : ${PORT}`);
});

module.exports = {
  server,
};
