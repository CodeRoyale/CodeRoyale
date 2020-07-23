rooms = {};

// room_id will be admin name

const createRoom = (config) => {
  if (!config.admin) {
    throw new Error("Create Room requires a admin !");
  }
  if (!rooms[config.admin]) {
    // if private is not passed then privateRoom will be false(not undefined)

    const room_id = admin,
      privateRoom = config.private === true,
      max_teams = config.max_teams || 2,
      max_perTeam = config.max_perTeam || 3;

    const room_obj = { room_id, admin, privateRoom, max_teams, max_perTeam };
    return room_obj;
  } else {
    // user already has an active room
    throw new Error("User already has a room !");
  }
};

const joinRoom = (id) => {};

const changeTeam = (room_id) => {};

const closeRoom = (room_id) => {};

const banMember = (room_id) => {};

const addPrivateList = (room_id) => {
  // only private rooms can have rivate lists
};

module.exports = {
  createRoom,
  joinRoom,
  changeTeam,
  closeRoom,
};
