// this is my db for now
users = {};

// all details related to a user connected to socket will be stored here

const adduser = (userName, socket_id) => {
  if (!users[userName]) {
    users[userName] = socket_id;
  }
  return false;
};

const deleteUser = (userName) => {
  if (users[userName]) {
    delete users.userName;
    return true;
  }
  return false;
};

// this is just for extra checking
// can change room_id and team_name
const updateUserDetails = (changes) => {
  if (users[userName]) {
    users[userName].changes.roomId;
  }
  return false;
};

module.exports;
