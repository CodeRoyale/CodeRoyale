const usersRedis = require('../../service/usersRedis');

// Remove a user's details from Redis
const removeUser = async (userName) => {
  try {
    const users = await usersRedis.getUsersStore();
    if (users[userName]) {
      console.log(`${userName} + ' removed'`);
      delete users[userName];
      await usersRedis.updateUsersStore(users);
      return { status: 1, users: users };
    }
    return { status: 0, error: 'Username doesnot exist' };
  } catch (error) {
    return { status: 0, error: error.message };
  }
};

module.exports = removeUser;
