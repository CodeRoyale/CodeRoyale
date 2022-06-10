const usersRedis = require('../../service/usersRedis');

// Update user details in Redis
const updateUser = async (updatedUser) => {
  try {
    const users = await usersRedis.getUsersStore();

    users[updatedUser.userName] = {
      ...users[updatedUser.userName],
      ...updatedUser,
    };
    await usersRedis.updateUsersStore(users);
    return { status: 1, userObj: users[updatedUser.userName] };
  } catch (error) {
    console.log(error);
    return { status: 0, error: error.message };
  }
};

module.exports = updateUser;
