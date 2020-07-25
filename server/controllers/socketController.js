// import all actions
const { CREATE_ROOM } = require("../socketActions/userActions");
const {
  CONNECTION_ACK,
  CONNECTION_DENY,
} = require("../socketActions/serverActions");

//import controllers
const { addUser } = require("../controllers/userController");
const {
  createRoom,
  joinRoom,
  getRoomData,
} = require("../controllers/roomController");

const checkToken = (token) => {
  //just for testing will change later
  if (token[0] !== "z") {
    return {
      userName: token,
    };
  } else {
    false;
  }
};

const authUser = (socket, next) => {
  try {
    // check the token
    // token format "Bearer Token"
    const token = socket.handshake.headers.authorization.split(" ")[1];
    const payload = checkToken(token);

    //if sucessfull
    if (payload) {
      // connection accepted
      // now check if user is already connected or not
      if (!addUser(payload.userName, socket.id)) {
        socket.emit(CONNECTION_ACK);
        socket.userDetails = payload;
        next();
      } else {
        throw new Error("Already Conected");
      }
    } else {
      console.log("Invalid token");
      socket.emit(CONNECTION_DENY);
      throw new Error("Auth failed");
    }
  } catch (err) {
    socket.emit();
    next(err);
  }
};

const handleUserEvents = (socket) => {
  // auth middle ware will set this based on jwt payload
  let userDetails = socket.userDetails;
  socket.on(CREATE_ROOM, (config, cb) => {
    console.log("got req");
    config.admin = userDetails.userName;
    let data = "error";
    if (createRoom(config)) {
      console.log("made room");
      data = getRoomData(userDetails.userName);
    }
    cb(data);
  });
};

module.exports = {
  authUser,
  handleUserEvents,
};
