const { encryptData } = require("../utils/auth");
const { setRoom, getUser, setTeam, mapNameToId } = require("./userController");
const { getQuestions } = require("../utils/qapiConn");
const {
  ROOM_UPDATED,
  RCV_MSG,
  JOINED_ROOM,
  JOINED_TEAM,
  LEFT_TEAM,
  LEFT_ROOM,
  TEAM_CREATED,
  VETO_START,
  VETO_STOP,
  COMPETITION_STARTED,
  COMPETITION_STOPPED,
} = require("../socketActions/serverActions");

const { io } = require("../server");

// this is my db for now
rooms = {};

// room_id will be admin name

const createRoom = (config, { socket }) => {
  try {
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
	    max_vote :  config.max_vote || 1
          },
          scoreboard: {},
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
  } catch (err) {
    return err.message;
  }
};

// users connecting to room
const joinRoom = ({ userName, room_id, team_name }, { socket }) => {
  try {
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
        rooms[room_id].teams[team_name].length <
          rooms[room_id].config.max_perTeam
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
  } catch (err) {
    return err.message;
  }
};

const removeUserFromRoom = ({ userName }) => {
  try {
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
      let newBench = rooms[room_id].state.bench.filter(
        (ele) => ele !== userName
      );
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
  } catch (err) {
    return err.message;
  }
};

const createTeam = ({ userName, team_name }, { socket }) => {
  try {
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
  } catch (err) {
    return err.message;
  }
};

const joinTeam = ({ userName, team_name }, { socket }) => {
  try {
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

      // remove from bench
      let newBench = rooms[user.room_id].state.bench.filter(
        (ele) => ele != userName
      );
      rooms[user.room_id].state.bench = newBench;

      //in new team
      rooms[user.room_id].teams[team_name].push(userName);
      setTeam(userName, team_name);

      // tell team-mates
      // tell team-mates
      socket.join(`${user.room_id}/${team_name}`);
      socket.to(user.room_id).broadcast.emit(ROOM_UPDATED, {
        type: JOINED_TEAM,
        data: { userName, team_name },
      });

      return rooms[user.room_id].teams[team_name];
    }
    return false;
  } catch (err) {
    return err.message;
  }
};

const leaveTeam = ({ userName }, { socket }) => {
  try {
    const { room_id, team_name } = getUser(userName);
    // check if in a room and in a team
    if (room_id && team_name) {
      let newTeam = rooms[room_id].teams[team_name].filter(
        (ele) => ele !== userName
      );
      rooms[room_id].teams[team_name] = newTeam;
      rooms[room_id].state.bench.push(userName);
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
  } catch (err) {
    return err.message;
  }
};

const closeRoom = ({ userName }) => {
  try {
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
  } catch (err) {
    return err.message;
  }
};

//TODO --> DELETE TEAM

const banMember = ({ room_id }) => {
  try {
  } catch (err) {
    return err.message;
  }
};

const addPrivateList = ({ room_id }) => {
  // only private rooms can have private lists
  try {
  } catch (err) {
    return err.message;
  }
};

const roomEligible = ({ userName }) => {
  try {
    // user is the one who requested
    let user = getUser(userName);
    room = rooms[user.userName];

    // if room exists user also exists
    if (
      room &&
      room.config.admin === user.userName &&
      Object.keys(room.teams).length > 1
    ) {
      return room;
    }
    return false;
  } catch (err) {
    return err.message;
  }
};

const handleUserDisconnect = ({ userName }) => {
  // need to fill this
  try {
  } catch (err) {
    return err.message;
  }
};

const forwardMsg = ({ userName, content, toTeam }, { socket }) => {
  try {
    const { room_id, team_name } = getUser(userName);

    // not in a room
    if (!room_id || !content) return false;

    const rcvrs = room_id;
    if (toTeam && team_name) {
      rcvrs += `/${team_name}`;
    }
    socket.to(rcvrs).broadcast.emit(RCV_MSG, { userName, content, toTeam });
    return true;
  } catch (err) {
    return err.message;
  }
};

const registerVotes = ({ userName, votes }, { socket }) => {
  try {
    const { room_id, team_name } = getUser(userName),
      room = rooms[room_id],
      { vetoOn, voted, allQuestions, max_vote } = room.competition.veto;

    // should be in a team
    // veto should be on
    // should not have already voted
    if (!team_name || !vetoOn || voted.includes(userName)) {
      throw new Error("Not in a team or voting stopped or already voted");
    }

    votes = votes.filter((id) => allQuestions.includes(id));
    // votes should be unique
    votes = [...new Set(votes)];
    // should not excede max_votes allowed
    if (votes.length > max_vote) votes = votes.slice(0, max_vote);
    // note votes
    votes.forEach((id) => {
      rooms[room_id].competition.veto.votes[id] += 1;
    });
    rooms[room_id].competition.veto.voted.push(userName);
    return rooms[room_id].competition.veto;
  } catch (err) {
    return err.message;
  }
};

const doVeto = async (quesIds, room_id, count, socket) => {
  return new Promise((resolve, reject) => {
    try {
      const room = rooms[room_id];
      if (
        rooms[room_id].competition.contestOn ||
        rooms[room_id].competition.veto.vetoOn
      ) {
        throw new Error("Veto not allowed now");
      }

      // set the room state
      rooms[room_id].competition.veto.vetoOn = true;
      rooms[room_id].competition.veto.allQuestions = quesIds;

      // iitailize votes with 0
      rooms[room_id].competition.veto.votes = {};
      rooms[room_id].competition.veto.voted = [];
      quesIds.forEach((id) => {
        rooms[room_id].competition.veto.votes[id] = 0;
      });

      // tell every1 voting started
      socket.to(room_id).emit(VETO_START, quesIds);

      setTimeout(() => {
        // no need to remove listeners
        // all of them are volatile listners
        // calculate veto results

        rooms[room_id].competition.veto.vetoOn = false;
        const results = Object.entries(rooms[room_id].competition.veto.votes);
        results = results.sort((a, b) => b[1] - a[1]).slice(0, count);
        // take only qids
        results = results.map((ele) => ele[0]);
        rooms[room_id].competition.questions = results;

        socket.to(room_id).emit(VETO_STOP, results);
        resolve(results);
      }, 300000);
    } catch (err) {
      reject(err);
    }
  });
};

const startCompetition = async ({ userName }, { socket }) => {
  try {
    console.log("Starting competition");

    const user = getUser(userName),
      room = rooms[user.room_id];

    // room exists
    // user is admin
    // 2 or more members are there
    // 2 or more teams required
    // each team should hav atleast member
    // and no ongoing contest
    if (
      !room ||
      room.config.admin !== userName ||
      room.state.cur_memCount < 2 ||
      Object.keys(room.teams).length < 2 ||
      !atLeastPerTeam(room_id) ||
      rooms[room_id].competition.contestOn ||
      rooms[room_id].competition.veto.vetoOn
    ) {
      return false;
    }

    // start veto now and wait for it to end
    const allQuestions = await getQuestions(10);
    await doVeto(allQuestions, room_id, 3, socket);

    // start competition now
    room[room_id].competition.contestOn = true;
    room[room_id].competition.contestStartedAt = Data.now();
    socket.to(room_id).emit(COMPETITION_STARTED, room[room_id].competition);

    // code for stopping competition
    setTimeout(() => {
      room[room_id].competition.contestOn = false;
      room[room_id].competition.contnetEndedAt = Date.now();
      socket.to(room_id).emit(COMPETITION_STOPPED, room[room_id].competition);
    }, room.competition.timeLimit);

    return room[room_id].competition;
  } catch (err) {
    return err.message;
  }
};

// @util function to check if all teams have atleast min_size member
const atLeastPerTeam = (room_id, min_size = 1) => {
  try {
    for (const [name, memList] of Object.entries(rooms[room_id].teams)) {
      if (memList.length < min_size) return false;
    }
    return true;
  } catch (err) {
    return err.message;
  }
};

const getRoomData = (room_id) => {
  try {
    return rooms[room_id];
  } catch (err) {
    return err.message;
  }
};

const getRoomsData = () => {
  try {
    return rooms;
  } catch (err) {
    return err.message;
  }
};

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
  startCompetition,
  registerVotes,
};
