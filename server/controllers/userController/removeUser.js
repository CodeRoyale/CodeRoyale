const UserModel = require('../../models/user');

// Remove a user's details
const removeUser = async (userName) => {
  const returnObj = await UserModel.removeUser(userName);
  if (returnObj.status === 0) {
    return returnObj.error;
  }
  return returnObj.users;
};

module.exports = removeUser;
