const { submitCode } = require("../utils/codeExecution");

// this is my db for now
users = {};

// all details related to a user connected to socket will be stored here

const addUser = (userName, socket_id) => {
  try{
  if (!users[userName]) {
    // new connection
    console.log(userName + " added");
    users[userName] = { socket_id, room_id: "", team_name: "" };
  } else {
    // reconnecting
    console.log(userName + " reconnected");
    users[userName].socket_id = socket_id;
  }
  return users[userName];
  }
  catch(err)
  {
    return err.message || false;
  }
};

const removeUser = (userName) => {
  try{
  if (users[userName]) {
    console.log(userName + " removed");
    delete users[userName];
    return true;
  }
  return false;
  }
  catch(err)
  {
    return err.message || false;
  }
};

// this is just for extra checking
// can change room_id and team_name
const setRoom = (userName, room_id, team_name) => {
  try{
  //check if user is still connected
  if (users[userName]) {
    users[userName].room_id = room_id;
    users[userName].team_name = team_name || "";
    return true;
  }
  return false;
  }
  catch(err)
  {
    return err.message || false;
  }
};

const setTeam = (userName, team_name) => {
  try{
  if (users[userName]) {
    users[userName].team_name = team_name;
    return true;
  }
  return false;
  }
  catch(err)
  {
    return err.message || false;
  }
};

const getUser = (userName) => {
  try{
    users[userName]
  }
  catch(err)
  {
    return err.message || false;
  }
};

const getUserData = () => {
  try{
    users
  }
  catch(err)
  {
    return err.message || false;
  }
};

module.exports = {
  addUser,
  getUserData,
  setRoom,
  getUser,
  removeUser,
  setTeam,
};
