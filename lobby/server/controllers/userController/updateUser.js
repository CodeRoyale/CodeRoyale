const UserModel = require('../../models/user');

// Update details of user
const updateUser = async (updatedUser) => {
  // this is just for extra checking
  // can change roomId and teamName
  const check = [
    'userName',
    'socketId',
    'roomId',
    'teamName',
    'rank',
    'profilePicture',
  ];
  const newUpdated = {};
  check.forEach((field) => {
    if (updatedUser[field] !== undefined)
      newUpdated[field] = updatedUser[field];
  });
  // let newUpdatedUser = Object.keys(updatedUser).filter((ele) =>
  // 	check.includes(ele)
  // );
  // console.log(newUpdated);
  const returnObj = await UserModel.updateUser(newUpdated);
  return returnObj.userObj;
};

module.exports = updateUser;
