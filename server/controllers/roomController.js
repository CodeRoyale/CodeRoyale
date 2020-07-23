// this is my db for now
rooms = {};

// room_id will be admin name

const createRoom = (config) => {
  if (!config.admin) {
    throw new Error("Create Room requires a admin !");
  }
  if (!rooms[config.admin]) {
    // if private is not passed then privateRoom will be false(not undefined)

    //we can add limits to all these paramerters afterwards

    const room_id = admin,
      privateRoom = config.private === true,
      teams = {},
      max_teams = config.max_teams || 2,
      max_perTeam = config.max_perTeam || 3,
      questions = {},
      createdAt = Date.now();
    const room_obj = {
      room_id,
      admin,
      privateRoom,
      max_teams,
      max_perTeam,
      createdAt,
    };
    return room_obj;
  } else {
    // user already has an active room
    throw new Error("User already has a room !");
  }
};

const createTeam = (room_id , teamName) => {
  if( )
}

// users connecting to room

const joinRoom = (room_id, teamName) => {
  //only run if room exists
  //quit from prev room and team
};

const joinTeam = (teamName) => {
  // only run if
  //ditch prev team
};

const closeRoom = (room_id) => {};

const banMember = (room_id) => {};

const addPrivateList = (room_id) => {
  // only private rooms can have rivate lists
};

module.exports = {
  createRoom,
  joinRoom,
  joinTeam,
  closeRoom,
};
