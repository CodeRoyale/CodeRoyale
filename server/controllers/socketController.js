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
  ADD_PRIVATE_LIST,
  VETO_VOTES,
  CODE_SUBMISSION,
  FIND_SOLO_MATCH,
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
  registerVotes,
  startCompetition,
  forwardMsg,
  addPrivateList,
  codeSubmission,
  findSoloMatch,
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
  dataFromServer,
  asynFunc = false,
  failReply = "Some error occured !",
  ACTION = ""
) => (dataFromClient, cb) => {
  // if user didnt pass anything
  if (!dataFromClient) dataFromClient = {};
  dataFromClient.userName = dataFromServer.socket.userDetails.userName;
  let data;
  if (!asynFunc) {
    data = actionResponder(dataFromClient, dataFromServer) || failReply;
    console.log(data);
    if (cb) cb(data);
  } else {
    actionResponder(dataFromClient, dataFromServer)
      .then((data) => {
        console.log(data);
        if (cb) cb(data);
      })
      .catch((err) => {
        console.log(err.message);
        if (cb) cb(err.message);
      });
  }
};

const handleUserEvents = (socket) => {
  socket.on(CREATE_ROOM, genericActionCreater(createRoom, { socket }));
  socket.on(JOIN_ROOM, genericActionCreater(joinRoom, { socket }));
  socket.on(CREATE_TEAM, genericActionCreater(createTeam, { socket }));
  socket.on(JOIN_TEAM, genericActionCreater(joinTeam, { socket }));
  socket.on(CLOSE_ROOM, genericActionCreater(closeRoom, { socket }));
  socket.on(SEND_MSG, genericActionCreater(forwardMsg, { socket }));
  socket.on(LEAVE_TEAM, genericActionCreater(leaveTeam, { socket }));
  socket.on(GET_ROOM, genericActionCreater(getRoomData, { socket }));
  socket.on(VETO_VOTES, genericActionCreater(registerVotes, { socket }));
  socket.on(
    START_COMPETITION,
    genericActionCreater(startCompetition, { socket }, true)
  );
  socket.on(
    CODE_SUBMISSION,
    genericActionCreater(codeSubmission, { socket }, true)
  );
  socket.on(ADD_PRIVATE_LIST, genericActionCreater(addPrivateList, { socket }));
  socket.on(FIND_SOLO_MATCH, genericActionCreater(findSoloMatch, { socket }));
  socket.on("disconnect", () => {
    // removeUser(socket.userDetails.userName);
  });
};

const setQuestions = async () => {
  // veto proceess here
};

module.exports = {
  authUser,
  handleUserEvents,
};
