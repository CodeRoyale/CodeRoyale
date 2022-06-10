const UserModel = require('../../models/user');

// Get a single user's data
const getUser = async (userName) => {
  const returnObj = await UserModel.getUser(userName);
  if (returnObj.status === 0) {
    return returnObj.error;
  }
  return returnObj.userObj;
};

module.exports = getUser;
