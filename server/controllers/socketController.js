// import all actions
const {
  CREATE_ROOM,
  JOIN_ROOM,
  CREATE_TEAM,
  JOIN_TEAM,
  START_COMPETITION,
  CLOSE_ROOM,
  SEND_MSG,
  LEAVE_TEAM,
  GET_ROOM,
} = require("../socketActions/userActions");
const {
  CONNECTION_ACK,
  CONNECTION_DENY,
} = require("../socketActions/serverActions");

//import controllers
const { addUser, removeUser } = require("../controllers/userController");
const {
  createRoom,
  createTeam,
  joinTeam,
  joinRoom,
  getRoomData,
  leaveTeam,
  closeRoom,
  roomEligible,
  forwardMsg,
} = require("../controllers/roomController");

// import utils
const { getQuestions } = require("../utils/qapiConn");

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
      if (addUser(payload.userName, socket.id)) {
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

// we can move this inside handleuserevnets

const genericActionCreater = (
  actionResponder,
  socket,
  failReply = "Some error occured !",
  ACTION = ""
) => (config, cb) => {
  // only passes userName
  config.userName = socket.userDetails.userName;
  let data = actionResponder(config, socket) || failReply;
  if (data != failReply) {
    console.log(`${ACTION} succesfull !`);
  }
  cb(data);
};

const handleUserEvents = (socket) => {
  // auth middle ware will set this based on jwt payload
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
  // but below approach is shorter
  socket.on(CREATE_ROOM, genericActionCreater(createRoom, socket));
  socket.on(JOIN_ROOM, genericActionCreater(joinRoom, socket));
  socket.on(CREATE_TEAM, genericActionCreater(createTeam, socket));
  socket.on(JOIN_TEAM, genericActionCreater(joinTeam, socket));
  socket.on(CLOSE_ROOM, genericActionCreater(closeRoom, socket));
  socket.on(SEND_MSG, genericActionCreater(forwardMsg, socket));
  socket.on(LEAVE_TEAM, genericActionCreater(leaveTeam, socket));
  socket.on(GET_ROOM, genericActionCreater(getRoomData, socket));
  // admin wants to start the competition
  socket.on(START_COMPETITION, async (dataFromClient, cb) => {
    // check if room is eligible
    let { userDetails } = socket;
    // user is allowed to start, and room meets requirement
    let eligibleRoom = roomEligible(userDetails.userName);
    if (eligibleRoom) {
      // add event listeners and remove for veto

      // start question selection
      // get numberOfTeams+numberQuestion ques from api
      // start selection process

      let allQuestions = await getQuestions();

      // veto process
      let selectedQuestions = await setQuestions(allQuestions);
      // end of selection

      // add event listeners for code submit
      // this is just prototype
      socket.on("CODE_SUBMIT", ({ code, lang }, cb) => {
        // call codeExec api
        //wait for result
        // check output
        // send back result in cb
        // update score based on result
        // call other events if required
      });
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.userDetails.userName);
  });
};

const setQuestions = async () => {
  // veto proceess here
};

module.exports = {
  authUser,
  handleUserEvents,
};
