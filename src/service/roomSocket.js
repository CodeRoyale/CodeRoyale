import { ERROR_MSG } from '../utils/constants';

export const createRoom = (
  socket,
  {
    max_teams,
    max_perTeam,
    max_perRoom,
    timeLimit,
    privateRoom,
    max_questions,
    max_vote,
    veto_quesCount,
  },
  cb
) => {
  if (!socket) return false;

  socket.emit(
    'CREATE_ROOM',
    {
      max_teams,
      max_perTeam,
      max_perRoom,
      timeLimit,
      privateRoom,
      max_questions,
      max_vote,
      veto_quesCount,
    },
    (data) => {
      if (data) {
        if (data !== ERROR_MSG) {
          // Create room success
          return cb(null, data);
        }
        // Create room fail
        return cb(data, null);
      }
      // Server didnt send back data
      return cb('No response from server', null);
    }
  );
};

export const joinRoom = (socket, { room_id }, cb) => {
  if (!socket) return false;

  socket.emit('JOIN_ROOM', { room_id }, (data) => {
    console.log(data);
    if (data) {
      if (data !== ERROR_MSG) {
        // Join room success
        return cb(null, data);
      }
      // Join room fail
      return cb(data, null);
    }
    // Server didnt send back data
    return cb('No response from server', null);
  });
};
