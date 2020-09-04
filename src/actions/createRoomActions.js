import { CREATE_ROOM } from './types';
import { ERROR_MSG, ROOM_CREATED } from '../utils/constants';
import { roomRequest, roomSuccess, roomFailure } from './roomActions';

// Async action...
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
  }
) => {
  return (dispatch) => {
    dispatch(roomRequest());
    socket.emit(
      CREATE_ROOM,
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
        if (data !== null) {
          if (data !== ERROR_MSG) {
            dispatch(roomSuccess(data, ROOM_CREATED));
          } else {
            dispatch(roomFailure(data));
          }
        } else {
          dispatch(roomFailure('No data Received'));
        }
        console.log('Create Room', data);
      }
    );
  };
};
