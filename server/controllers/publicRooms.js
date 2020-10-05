// this will controll all public rooms and matches

// use a balances binary tree here
const waitQueue = [];

const {
  createRoom,
  createTeam,
  joinTeam,
  joinRoom,
  startCompetition,
} = require("../controllers/roomController");

// change to const
const getPos = (ele, l, r) => {
  // binary search
  // log(n)
  if (r < l) return l;
  if (r === l) {
    if (ele.rank > waitQueue[r].rank) return r + 1;
    else return r;
  }

  const mid = Math.floor((l + r) / 2);
  if (waitQueue[mid].rank === ele.rank) return mid;

  if (waitQueue[mid].rank > ele.rank) return getPos(ele, l, mid - 1);
  else return getPos(ele, mid + 1, r);
};

const getMatch = (user) => {
  const matchPos = getPos(user);
  const matchedUser = waitQueue[matchPos];
  return Math.abs(matchedUser.rank - user.rank) > rankMargin
    ? null
    : { matchedUser, matchPos };
};

const insertInQueue = (user, { socket, io }) => {
  // find if anyone matches
  const match = getMatch(user);
  if (match) {
    const { matchedUser, matchPos } = match;
    waitQueue.splice(matchPos, 1);
    matchUp(user, matchedUser, { socket, io });
  } else {
    let newPos = getPos(user.rank, 0, waitQueue.len);
    waitQueue.splice(newPos, 0, user);
  }
};

const matchUp = (userA, userB, { socket, io }) => {
  // create room
  const room = createRoom({ userName: userA.userName }, { socket });
  room_id = room.config.id;

  //create team1 and team2
  const team1 = "Team 1";
  const team2 = "Team 2";
  createTeam({ userName: userA.userName, team1 }, { socket });
  createTeam({ userName: userA.userName, team2 }, { socket });

  //join team for userA
  joinTeam({ userName: userA.userName, team1 }, { socket });

  // join room and team for userB
  joinRoom({ userName: userB.userName, room_id, team2 }, { socket });

  // send user A and B FOUND_MATCH
  io.to(userA.socket_id).emit("MATCH_FOUND", room);
  io.to(userB.socket_id).emit("MATCH_FOUND", room);
};
