import { ERROR_MSG, ROOM_CLOSED } from '../utils/constants';
import { roomRequest, roomSuccess, roomFailure } from './roomActions';

export const closeRoom = (socket) => {
  return (dispatch) => {
    if (socket !== null) {
      dispatch(roomRequest());
      socket.emit('CLOSE_ROOM', {}, (data) => {
        if (data !== null) {
          if (data !== ERROR_MSG && data.error === undefined) {
            dispatch(roomSuccess(data, ROOM_CLOSED));
          } else if (data.error !== undefined) {
            dispatch(roomFailure(data.error));
          } else {
            dispatch(roomFailure(data));
          }
        } else {
          dispatch(roomFailure('No data Received'));
        }
        console.log('Close Room', data);
      });
    } else {
      dispatch(roomFailure('Server not connected...'));
    }
  };
};
