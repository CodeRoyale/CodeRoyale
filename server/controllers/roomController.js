const { setRoom, getUser } = require("../controllers/userController");

// this is my db for now
rooms = {};

// room_id will be admin name

const createRoom = (config) => {
  if (!config.admin) {
    return false;
  }
  if (!rooms[config.admin]) {
    // remove admin from current room

    let admin = getUser(config.admin);
    if (admin.room_id) {
      // admin is already in a grp
      //this will always return true,cause user doesnt have a room
      removeUserFromRoom(admin);
    }

    // if private is not passed then privateRoom will be false(not undefined)
    //we can add limits to all these paramerters afterwards
    const room_id = config.admin;
    const room_obj = {
      admin: config.admin,
      teams: {},
      questions: {},
      bench: [],
      privateRoom: config.private === true,
      privateList: [],
      max_teams: config.max_teams || 2,
      max_perTeam: config.max_perTeam || 3,
      cur_memCount: 0,
      max_perRoom: config.max_perTeam || 10,
      banList: [],
      createdAt: Date.now(),
      contestStartedAt: null,
      timeLimit: config.timeLimit || 2700000,
    };

    rooms[room_id] = room_obj;
    return true;
  }
  // user already has an active room
  return true;
};

// users connecting to room
const joinRoom = (userName, room_id, teamName) => {
  if (
    rooms[room_id] &&
    (!rooms[room_id].privateRoom ||
      rooms[room_id].privateList.includes(userName)) &&
    rooms[room_id].cur_memCount < rooms[room_id].max_perRoom
  ) {
    //(only run if room exists) and (user is allowed if private) and (space is there)

    //quit from prev room and try again
    let user = getUser(userName);
    if (user.room_id) {
      // already in a grp dont allow
      return false;
    }

    if (
      teamName &&
      rooms[room_id].teams[teamName] &&
      rooms[room_id].teams[teamName].length < rooms[room_id].max_perTeam
    ) {
      // if user passess a team and that team exist and ther is space in that team
      rooms[room_id].teams[teamName].push(userName);
    } else {
      // else bench the user
      rooms[room_id].bench.push(userName);
    }
    //user has been added to bench or a Team
    rooms[room_id].cur_memCount += 1;
    return true;
  }
  return false;
};

const removeUserFromRoom = (userName) => {
  // remove from room
  const user = getUser(userName);

  // if user is a admin then no leave only delelte possible
  // it cause of the way i am storing room_id ( == adminName)
  if (rooms[user.room_id].admin === userName) {
    return false;
  }

  if (user.teamName) {
    // if user has joined a team
    let newTeam = rooms[user.room_id].teams[user.teamName].filter(
      (ele) => ele !== userName
    );
    rooms[user.room_id].teams[user.teamName] = newTeam;
  } else {
    // if user is on a bench
    let newBench = rooms[user.room_id].bench.filter((ele) => ele !== userName);
    rooms[user.room_id].bench = newBench;
  }
  rooms[room_id].cur_memCount -= 1;
  return true;
};

const createTeam = (room_id, team_name) => {
  // if more teams are allowed
  //if teamName is not already used
  if (
    Object.keys(rooms[room_id].teams).length < rooms[room_id].max_teams &&
    !rooms[room_id].teams[team_name]
  ) {
    rooms[room_id].teams[team_name] = [];
  }
};

const joinTeam = (userName, team_name) => {
  const user = getUser(userName),
    room = rooms[user.room_id];
  // only run if user and room exits and user is in that room
  // and there is space
  if (
    user &&
    room &&
    room.teams[team_name] &&
    room.teams[team_name].length < room.max_perTeam
  ) {
    //ditch prev team
    if (user.team_name) {
    } else {
      // user was on bench
    }
  }
};

const leaveTeam = (userName) => {
  const user = getUser(userName);
  //onit
};

const closeRoom = (room_id) => {};

const banMember = (room_id) => {};

const addPrivateList = (room_id) => {
  // only private rooms can have rivate lists
};

const getRoomData = () => rooms;

module.exports = {
  createRoom,
  joinRoom,
  joinTeam,
  closeRoom,
  createTeam,
  getRoomData,
};
