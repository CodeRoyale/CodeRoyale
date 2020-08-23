const { submitCode } = require("../utils/codeExecution");

// this is my db for now
users = {};

// all details related to a user connected to socket will be stored here

const addUser = (userName, socket_id) => {
  if (!users[userName]) {
    console.log(userName + " added");
    users[userName] = { socket_id, room_id: "", team_name: "" };
  }
  return true;
};

const removeUser = (userName) => {
  if (users[userName]) {
    console.log(userName + " removed");
    delete users[userName];
    return true;
  }
  return false;
};

// this is just for extra checking
// can change room_id and team_name
const setRoom = (userName, room_id, team_name) => {
  //check if user is still connected
  if (users[userName]) {
    users[userName].room_id = room_id;
    users[userName].team_name = team_name || "";
    return true;
  }
  return false;
};
const setTeam = (userName, team_name) => {
  if (users[userName]) {
    users[userName].team_name = team_name;
    return true;
  }
  return false;
};

const getUser = (userName) => users[userName];

const getUserData = () => users;

module.exports = {
  addUser,
  getUserData,
  setRoom,
  getUser,
  removeUser,
  setTeam,
};
