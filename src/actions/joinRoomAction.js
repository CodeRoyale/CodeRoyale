import { JOIN_ROOM } from './types';
import { ERROR_MSG, ROOM_JOINED } from '../utils/constants';
import { roomRequest, roomSuccess, roomFailure } from './roomActions';
import { getRoom } from './getRoomAction';

export const joinRoom = (socket, { room_id }) => {
  return (dispatch) => {
    if (socket !== null) {
      dispatch(roomRequest());
      socket.emit(JOIN_ROOM, { room_id }, (data) => {
        if (data !== null) {
          if (data !== ERROR_MSG) {
            dispatch(roomSuccess(data, ROOM_JOINED));
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
        console.log('Join Room', data);
      });
    } else {
      dispatch(roomFailure('Server not connected...'));
    }
  };
};
