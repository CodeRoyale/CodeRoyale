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
          cb(null, data);
        } else {
          // Create room fail
          cb(data, null);
        }
      } else {
        // Server didnt send back data
        cb('No response from server', null);
      }
    }
  );
};
