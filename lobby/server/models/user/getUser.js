const usersRedis = require('../../service/usersRedis');

// Get a single user's data from Redis
const getUser = async (userName) => {
  try {
    const users = await usersRedis.getUsersStore();
    return { status: 1, userObj: users[userName] };
  } catch (err) {
    return { status: 0, error: err.message || false };
  }
};

module.exports = getUser;
