// connection ack
const CONNECTION_ACK = "CONNECTION_ACK";

// connection deny
const CONNECTION_DENY = "CONNECTION_DENY";

// update client about updated room
// currently this will only track members updation
const ROOM_UPDATED = "ROOM_UPDATED";

// types of ROOM_UPDATED
// 1. a user joined the room
const JOINED_ROOM = "JOINED_ROOM";
// 2. joined a team in the room
const JOINED_TEAM = "JOINED_TEAM";
// 3 . left the team
const LEFT_TEAM = "LEFT_TEAM";
// 4. left the room
const LEFT_ROOM = "LEFT_ROOM";
// 5. create a team
const TEAM_CREATED = "TEAM_CREATED";
// to forward sent message
const RCV_MSG = "RCV_MSG";

module.exports = {
  CONNECTION_ACK,
  CONNECTION_DENY,
  ROOM_UPDATED,
  JOINED_ROOM,
  JOINED_TEAM,
  LEFT_TEAM,
  LEFT_ROOM,
  RCV_MSG,
  TEAM_CREATED,
};
