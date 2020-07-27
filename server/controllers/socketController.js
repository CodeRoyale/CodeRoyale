// import all actions
const {
  CREATE_ROOM,
  JOIN_ROOM,
  CREATE_TEAM,
  JOIN_TEAM,
} = require("../socketActions/userActions");
const {
  CONNECTION_ACK,
  CONNECTION_DENY,
} = require("../socketActions/serverActions");

//import controllers
const { addUser } = require("../controllers/userController");
const {
  createRoom,
  createTeam,
  joinTeam,
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

const genericActionCreater = (
  actionResponder,
  actionReply,
  userDetails,
  failReply = "Some error occured !",
  ACTION = ""
) => (config, cb) => {
  // only passes userName
  console.log(config);
  console.log(`Got ${ACTION}`);
  config.userName = userDetails.userName;
  let data = failReply;
  if (actionResponder(config)) {
    console.log(`${ACTION} succesfull !`);
    data = actionReply(userDetails.userName);
  }
  cb(data);
};

const handleUserEvents = (socket) => {
  // auth middle ware will set this based on jwt payload
  console.log(socket.userDetails.userName);
  // ideal
  // socket.on(
  //   CREATE_ROOM,
  //   genericActionCreater(
  //     createRoom,
  //     getRoomData,
  //     "Could'nt create room !",
  //     CREATE_ROOM
  //   )
  // );
  // shorter
  socket.on(
    CREATE_ROOM,
    genericActionCreater(createRoom, getRoomData, socket.userDetails)
  );
  socket.on(
    JOIN_ROOM,
    genericActionCreater(joinRoom, getRoomData, socket.userDetails)
  );
  socket.on(
    CREATE_TEAM,
    genericActionCreater(createTeam, getRoomData, socket.userDetails)
  );
  socket.on(
    JOIN_TEAM,
    genericActionCreater(joinTeam, getRoomData, socket.userDetails)
  );
};

module.exports = {
  authUser,
  handleUserEvents,
};
