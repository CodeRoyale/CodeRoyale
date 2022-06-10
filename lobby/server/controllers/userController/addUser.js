const UserModel = require('../../models/user');

// Store new user connected through web sockets details
const addUser = async ({
  userName,
  socketId,
  profilePicture,
  rank = 1,
  roomId = '',
  teamName = '',
}) => {
  const returnObj = await UserModel.addUser({
    userName,
    socketId,
    roomId,
    teamName,
    rank,
    profilePicture,
  });
  if (returnObj.status === 0) {
    console.log(returnObj.error);
    return false;
  }
  return returnObj.userObj;
};

module.exports = addUser;
