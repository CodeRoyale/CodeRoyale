import { CREATE_ROOM } from './types';
import { ERROR_MSG, ROOM_CREATED } from '../utils/constants';
import { roomRequest, roomSuccess, roomFailure } from './roomActions';
import { getRoom } from './getRoomAction';

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
            const room_id = data.config.id;
            socket.on('ROOM_UPDATED', (data) => {
              if (data !== null && data.type !== undefined) {
                //console.log('getRoom', data);
                dispatch(getRoom(socket, { room_id }));
              }
            });
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
