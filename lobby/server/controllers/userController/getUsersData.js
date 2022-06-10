const UserModel = require('../../models/user');

// Get all user's data
const getUsersData = async () => {
  // need proper authorizations
  const returnObj = await UserModel.getUsersData();
  if (returnObj.status === 0) {
    return returnObj.error;
  }
  return returnObj.userObj;
};

module.exports = getUsersData;
