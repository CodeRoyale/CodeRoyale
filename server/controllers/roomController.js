const { setRoom, getUser, setTeam } = require("../controllers/userController");
const { encryptData } = require("../utils/auth");

// this is my db for now
rooms = {};

// room_id will be admin name

const createRoom = (config) => {
  const user = getUser(config.userName);
  if (user.room_id) {
    // please leave current room
    return false;
  }

  const room_id = encryptData(config.userName);
  // user who made room is admin
  config.admin = config.userName;

  if (!rooms[room_id]) {
    // if private is not passed then privateRoom will be false(not undefined)
    //we can add limits to all these paramerters afterwards
    // -TODO --> add score for teams

    // a room has 4 parts -> config, state, competition, teams
    const room_obj = {
      config: {
        id: room_id,
        admin: config.admin,
        max_teams: config.max_teams || 2,
        max_perTeam: config.max_perTeam || 3,
        privateRoom: config.privateRoom === false,
        max_perRoom: config.max_perRoom || 10,
        createdAt: Date.now(),
      },
      state: {
        privateList: [],
        cur_memCount: 1,
        banList: [],
        bench: [config.admin],
      },
      competition: {
        questions: {},
        max_questions: config.max_questions || 4,
        contestStartedAt: null,
        contnetEndedAt: null,
        contestOngoing: false,
        timeLimit: config.timeLimit || 2700000,
        veto: {
          allQuestions: {},
          votes: {},
          voted: [],
          vetoOngoing: false,
        },
      },
      teams: {},
    };

    // created room
    rooms[room_id] = room_obj;
  }
  // user already has an active room
  return rooms[room_id];
};

// users connecting to room
const joinRoom = ({ userName, room_id, team_name }) => {
  if (
    rooms[room_id] &&
    (!rooms[room_id].config.privateRoom ||
      rooms[room_id].state.privateList.includes(userName)) &&
    rooms[room_id].state.cur_memCount < rooms[room_id].config.max_perRoom
  ) {
    //(only run if room exists) and (user is allowed if private) and (space is there)

    //quit from prev room and try again
    let user = getUser(userName);
    if (user.room_id) {
      // already in a grp dont allow
      return false;
    }

    if (
      team_name &&
      rooms[room_id].teams[team_name] &&
      rooms[room_id].teams[team_name].length < rooms[room_id].config.max_perTeam
    ) {
      // if user passess a team and that team exist and there is space in that team
      rooms[room_id].teams[team_name].push(userName);
    } else {
      // else bench the user
      team_name = "";
      rooms[room_id].state.bench.push(userName);
    }

    setRoom(userName, room_id, team_name);
    //user has been added to bench or a Team
    rooms[room_id].state.cur_memCount += 1;
    return rooms[room_id];
  }
  return false;
};

const removeUserFromRoom = ({ userName }) => {
  // remove from room
  const user = getUser(userName);

  // if user is a admin then no leave only delete possible
  // it cause of the way i am storing room_id ( == adminName)
  if (rooms[user.room_id].config.admin === userName) {
    return false;
  }

  if (user.team_name) {
    // if user has joined a team
    let newTeam = rooms[user.room_id].teams[user.team_name].filter(
      (ele) => ele !== userName
    );
    rooms[user.room_id].teams[user.team_name] = newTeam;
  } else {
    // if user is on a bench
    let newBench = rooms[user.room_id].state.bench.filter(
      (ele) => ele !== userName
    );
    rooms[user.room_id].state.bench = newBench;
  }

  setRoom(userName, "", "");
  rooms[room_id].state.cur_memCount -= 1;
  return true;
};

const createTeam = ({ userName, team_name }) => {
  // if more teams are allowed
  //if team_name is not already used
  // and user is admin
  const user = getUser(userName);

  // if user not in room or not admin of the room
  if (!user.room_id || rooms[user.room_id].config.admin !== userName) {
    return false;
  }

  if (
    Object.keys(rooms[room_id].teams).length <
      rooms[room_id].config.max_teams &&
    !rooms[room_id].teams[team_name]
  ) {
    rooms[room_id].teams[team_name] = [];
    return rooms[room_id].teams;
  }
  return false;
};

const joinTeam = ({ userName, team_name }) => {
  const user = getUser(userName),
    room = rooms[user.room_id];
  // only run if user and room exits and user is in that room
  // and there is space
  if (
    room &&
    room.teams[team_name] &&
    room.teams[team_name].length < room.max_perTeam
  ) {
    if (user.team_name) {
      //ditch prev team
      let newTeam = rooms[user.room_id].teams[user.team_name].filter(
        (ele) => ele !== userName
      );
      rooms[user.room_id].teams[user.team_name] = newTeam;
    }
    //in new team
    rooms[user.room_id].teams[team_name].push(userName);
    setTeam(userName, team_name);
    return rooms[user.room_id].teams[team_name];
  }
  return false;
};

const leaveTeam = ({ userName }) => {
  const user = getUser(userName);
  // check if in a room and in a team
  if (user.room_id && user.team_name) {
    let newTeam = rooms[user.room_id].teams[user.team_name].filter(
      (ele) => ele !== userName
    );
    rooms[user.room_id].teams[user.team_name] = newTeam;
    rooms[user.room_id].bench.push(userName);
    setTeam(userName, "");
    return true;
  }
  return false;
};

const closeRoom = ({ room_id }) => {
  if (rooms[room_id]) {
    // everyone from room except admin
    let allMembers = rooms[room_id].bench;
    // from all teams
    Object.keys(rooms[room_id].teams).map((team_name) => {
      rooms[room_id].teams[team_name].forEach((user) => {
        allMembers.push(user);
      });
    });

    // not need to chage room data since we are going to delete it
    allMembers.forEach((userName) => {
      setRoom(userName, "");
    });

    // delete the stupid room
    delete rooms[room_id];
    return true;
  }
  return false;
};

const banMember = ({ room_id }) => {};

const addPrivateList = ({ room_id }) => {
  // only private rooms can have rivate lists
};

const roomEligible = ({ userName }) => {
  // user is the one who requested
  let user = getUser(userName);
  room = rooms[user.userName];

  // if room exists user also exists
  if (
    room &&
    room.admin === user.userName &&
    Object.keys(room.teams).length > 1
  ) {
    return room;
  }
  return false;
};

const getRoomData = (room_id) => rooms[room_id];
const getRoomsData = () => rooms;

module.exports = {
  createRoom,
  joinRoom,
  joinTeam,
  closeRoom,
  createTeam,
  getRoomData,
  getRoomsData,
  leaveTeam,
  roomEligible,
  removeUserFromRoom,
};
