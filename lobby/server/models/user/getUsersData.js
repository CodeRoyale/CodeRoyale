const usersRedis = require('../../service/usersRedis');

// Get all users connected data from Redis
const getUsersData = async () => {
  // need proper authorizations
  try {
    const users = await usersRedis.getUsersStore();
    return { status: 1, userObj: users };
  } catch (err) {
    return { status: 0, error: err.message || false };
  }
};

module.exports = getUsersData;
