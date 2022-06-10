const usersRedis = require('../../service/usersRedis');

// Store new user connected through web sockets details in Redis
const addUser = async ({
  userName,
  socketId,
  roomId,
  teamName,
  rank,
  profilePicture,
}) => {
  try {
    const users = await usersRedis.getUsersStore();

    if (!userName || !socketId || !profilePicture || !rank) {
      throw new Error('Give all parameters');
    }

    if (users[userName]) {
      console.log(`${userName} reconnected`);
      users[userName].socketId = socketId;
      await usersRedis.updateUsersStore(users);
      return { status: 1, userObj: users[userName] };
    }

    console.log(`${userName} added`);
    const newUser = {
      socketId: socketId,
      roomId: roomId,
      teamName: teamName,
      rank: rank,
      userName: userName,
      profilePicture: profilePicture,
    };
    users[userName] = newUser;
    await usersRedis.updateUsersStore(users);

    return { status: 2, userObj: users[userName] };
  } catch (error) {
    return { status: 0, error: error.message };
  }
};

module.exports = addUser;
