const { encryptData } = require("../utils/auth");
const { setRoom, getUser, setTeam } = require("./userController");
const {
  ROOM_UPDATED,
  RCV_MSG,
  JOINED_ROOM,
  JOINED_TEAM,
  LEFT_TEAM,
  LEFT_ROOM,
  TEAM_CREATED,
} = require("../socketActions/serverActions");

// this is my db for now
rooms = {};

// room_id will be admin name

const createRoom = (config, socket) => {
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

    setRoom(config.userName, room_id);
    socket.join(room_id);
    // created room
    rooms[room_id] = room_obj;
  }
  // user already has an active room
  return rooms[room_id];
};

// users connecting to room
const joinRoom = ({ userName, room_id, team_name }, socket) => {
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

    // succesfull (user will now be added)

    if (
      team_name &&
      rooms[room_id].teams[team_name] &&
      rooms[room_id].teams[team_name].length < rooms[room_id].config.max_perTeam
    ) {
      // if user passess a team and that team exist and there is space in that team
      rooms[room_id].teams[team_name].push(userName);
      // tell team-mates
      socket.join(`${room_id}/${team_name}`);
      socket.to(room_id).broadcast.emit(ROOM_UPDATED, {
        type: JOINED_TEAM,
        data: { userName, team_name },
      });
    } else {
      // else bench the user
      team_name = "";
      rooms[room_id].state.bench.push(userName);
    }

    setRoom(userName, room_id, team_name);

    //user has been added to bench or a Team
    rooms[room_id].state.cur_memCount += 1;

    // tell others , notify others ROOM_UPDATED
    socket.join(room_id);
    socket.to(room_id).broadcast.emit(ROOM_UPDATED, {
      type: JOINED_ROOM,
      data: { userName },
    });
    console.log(userName, " joined from ", room_id);
    return rooms[room_id];
  }
  return false;
};

const removeUserFromRoom = ({ userName }) => {
  // remove from room
  const { room_id, team_name } = getUser(userName);

  // if user is a admin then no leave only delete possible
  // it cause of the way i am storing room_id ( == adminName)
  if (rooms[room_id].config.admin === userName) {
    return false;
  }

  if (team_name) {
    // if user has joined a team
    let newTeam = rooms[room_id].teams[team_name].filter(
      (ele) => ele !== userName
    );
    rooms[room_id].teams[team_name] = newTeam;

    // no need to send team_name as this will only be sent to
    // ppl in "same team"
    socket.leave(`${room_id}/${team_name}`);
    socket.to(room_id).broadcast.emit(ROOM_UPDATED, {
      type: LEFT_TEAM,
      data: { userName, team_name },
    });
  } else {
    // if user is on a bench
    let newBench = rooms[room_id].state.bench.filter((ele) => ele !== userName);
    rooms[room_id].state.bench = newBench;
  }

  // removed
  rooms[room_id].state.cur_memCount -= 1;

  // tell others
  console.log(userName, " removed from ", room_id);
  setRoom(userName, "");
  socket.to(room_id).broadcast.emit(ROOM_UPDATED, {
    type: LEFT_ROOM,
    data: { userName },
  });
  socket.leave(room_id);

  return true;
};

const createTeam = ({ userName, team_name }, socket) => {
  // if more teams are allowed
  //if team_name is not already used
  // and user is admin
  const { room_id } = getUser(userName);
  // if user not in room or not admin of the room
  if (!room_id || rooms[room_id].config.admin !== userName) {
    return false;
  }

  if (
    Object.keys(rooms[room_id].teams).length <
      rooms[room_id].config.max_teams &&
    !rooms[room_id].teams[team_name]
  ) {
    rooms[room_id].teams[team_name] = [];

    // tell everyone
    socket.to(room_id).broadcast.emit(ROOM_UPDATED, {
      type: TEAM_CREATED,
      data: { team_name },
    });
    return rooms[room_id].teams;
  }
  return false;
};

const joinTeam = ({ userName, team_name }, socket) => {
  const user = getUser(userName),
    room = rooms[user.room_id];
  // only run if user and room exits and user is in that room
  // and there is space
  if (
    room &&
    room.teams[team_name] &&
    room.teams[team_name].length < room.config.max_perTeam
  ) {
    if (user.team_name) {
      //ditch prev team
      return false;
    }
    //in new team
    rooms[user.room_id].teams[team_name].push(userName);
    setTeam(userName, team_name);

    // tell team-mates
    // tell team-mates
    socket.join(`${room_id}/${team_name}`);
    socket.to(room_id).broadcast.emit(ROOM_UPDATED, {
      type: JOINED_TEAM,
      data: { userName, team_name },
    });

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
    rooms[user.room_id].state.bench.push(userName);
    setTeam(userName, "");

    // tell eveyone
    socket.leave(`${room_id}/${team_name}`);
    socket.to(room_id).broadcast.emit(ROOM_UPDATED, {
      type: LEFT_TEAM,
      data: { userName, team_name },
    });

    return true;
  }
  return false;
};

const closeRoom = ({ userName }) => {
  const { room_id } = getUser(userName);
  if (rooms[room_id]) {
    // everyone from room bench
    let allMembers = rooms[room_id].state.bench;
    // from all teams
    Object.keys(rooms[room_id].teams).forEach((team_name) => {
      rooms[room_id].teams[team_name].forEach((user) => {
        allMembers.push(user);
      });
    });
    console.log(allMembers);
    // not need to chage room data since we are going to delete it
    allMembers.forEach((userName) => {
      // this is a server action notify all
      // TODO --> add kick all and remove functions for sockets
      setRoom(userName, "");
    });

    // delete the stupid room
    delete rooms[room_id];
    return true;
  }
  return false;
};

//TODO --> DELETE TEAM

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

const handleUserDisconnect = (userName) => {
  // need to fill this
};

const forwardMsg = ({ userName, content, toTeam }, socket) => {
  const { room_id, team_name } = getUser(userName);

  // not in a room
  if (!room_id || !content) return false;

  const rcvrs = room_id;
  if (toTeam && team_name) {
    rcvrs += `/${team_name}`;
  }
  socket.to(rcvrs).broadcast.emit(RCV_MSG, { userName, content, toTeam });
  return true;
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
  forwardMsg,
  handleUserDisconnect,
};
