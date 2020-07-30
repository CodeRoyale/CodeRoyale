const { setRoom, getUser, setTeam } = require("../controllers/userController");

// this is my db for now
rooms = {};

// room_id will be admin name

const createRoom = (config) => {
  // user who made room is admin
  config.admin = config.userName;

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
      bench: [config.admin],
      privateRoom: config.private === true,
      privateList: [],
      max_teams: config.max_teams || 2,
      max_perTeam: config.max_perTeam || 3,
      cur_memCount: 1,
      max_perRoom: config.max_perRoom || 10,
      banList: [],
      createdAt: Date.now(),
      contestStartedAt: null,
      contnetEndedAt: null,
      contestOngoing: false,
      timeLimit: config.timeLimit || 2700000,
    };

    rooms[room_id] = room_obj;
    return true;
  }
  // user already has an active room
  return true;
};

// users connecting to room
const joinRoom = ({ userName, room_id, team_name }) => {
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
      team_name &&
      rooms[room_id].teams[team_name] &&
      rooms[room_id].teams[team_name].length < rooms[room_id].max_perTeam
    ) {
      // if user passess a team and that team exist and ther is space in that team
      rooms[room_id].teams[team_name].push(userName);
    } else {
      // else bench the user
      rooms[room_id].bench.push(userName);
    }

    setRoom(userName, room_id, team_name);
    //user has been added to bench or a Team
    rooms[room_id].cur_memCount += 1;
    return true;
  }
  return false;
};

const removeUserFromRoom = ({ userName }) => {
  // remove from room
  const user = getUser(userName);

  // if user is a admin then no leave only delelte possible
  // it cause of the way i am storing room_id ( == adminName)
  if (rooms[user.room_id].admin === userName) {
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
    let newBench = rooms[user.room_id].bench.filter((ele) => ele !== userName);
    rooms[user.room_id].bench = newBench;
  }

  setRoom(userName, "", "");
  rooms[room_id].cur_memCount -= 1;
  return true;
};

const createTeam = ({ room_id, team_name }) => {
  // if more teams are allowed
  //if team_name is not already used
  if (
    Object.keys(rooms[room_id].teams).length < rooms[room_id].max_teams &&
    !rooms[room_id].teams[team_name]
  ) {
    rooms[room_id].teams[team_name] = [];
    return true;
  }
  return false;
};

const joinTeam = ({ userName, team_name }) => {
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
    return true;
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

const startCompetition = ({ userName }) => {
  //Contest (username, teamID)

  // 1) User is in room && UserName == Admin && user is in team && No of teams in room == 2
  // 2) Contest is Ready
  // 3) Veto => Tag => UI => Send the tag to Question API => Get Question => Show question in Lobby UI => Show start contest button only to the Admin
  // 4) Start Contest
  // Update contestStartedAt and timeLimit
  // setTimeout(config.timeLimit, ( )=>{ //code to send stop contest} )

  let user = getUser(userName);
  room = getRoomData(user.room_id);

  if (
    user &&
    room &&
    room.admin === user.userName &&
    Object.keys(room.teams).length > 1
  ) {
    // allowed to start
    // do a veto
    // returns set of tag
    const getTagsFromRoom = getTagsFromRoom({ room_id });
  }

  rooms[room_id].contestOngoing = true;
};

const getTagsFromRoom = () => {
  // let p = new Promes( awd)
  // call q api
  // get any 9 random tags
  // ask user vote
};

const notifyTeam = () => {};

const notifyRoom = () => {};

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
};
