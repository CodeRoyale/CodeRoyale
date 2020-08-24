// user tries to connect
// spl
const CONNECTION = "connection";

// user tries to create a room
const CREATE_ROOM = "CREATE_ROOM";

// user tries to join a room
const JOIN_ROOM = "JOIN_ROOM";

// user tries to join a room
const CREATE_TEAM = "CREATE_TEAM";

// user tries to join a room
const JOIN_TEAM = "JOIN_TEAM";

// user submits code
const SUBMIT_CODE = "SUBMIT_CODE";

// user starts the competition
const START_COMPETITION = "START_COMPETITION";

// user starts the competition
const CLOSE_ROOM = "CLOSE_ROOM";

// uesr can request for a room
const GET_ROOM = "GET_ROOM";

// leave team
const LEAVE_TEAM = "LEAVE_TEAM";

// send msg to team or room
const SEND_MSG = "SEND_MSG";

// client's votes
const VETO_VOTES = "VETO_VOTES";

module.exports = {
  CONNECTION,
  CREATE_ROOM,
  JOIN_ROOM,
  CREATE_TEAM,
  JOIN_TEAM,
  SUBMIT_CODE,
  START_COMPETITION,
  CLOSE_ROOM,
  SEND_MSG,
  LEAVE_TEAM,
  GET_ROOM,
  VETO_VOTES,
};
