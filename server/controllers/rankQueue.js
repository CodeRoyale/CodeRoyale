// use a balances binary tree here
const waitQueue = [];

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

const insertInQueue = (user) => {
  // find if anyone matches
  const match = getMatch(user);
  if (match) {
    const { matchedUser, matchPos } = match;
    waitQueue.splice(matchPos, 1);
    matchUp(user, matchedUser);
  } else {
    let newPos = getPos(user.rank, 0, waitQueue.len);
    waitQueue.splice(newPos, 0, user);
  }
};

const matchUp = (userA, userB) => {
  // create room
  // join room
  // send user A and B FOUND_MATCH
};
