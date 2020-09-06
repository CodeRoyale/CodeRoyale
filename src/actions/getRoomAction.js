import { ERROR_MSG, ROOM_UPDATED } from '../utils/constants';
import { roomRequest, roomSuccess, roomFailure } from './roomActions';

export const getRoom = (socket, { room_id }) => {
  return (dispatch) => {
    if (socket !== null) {
      dispatch(roomRequest());
      socket.emit('GET_ROOM', { room_id }, (data) => {
        if (data !== null) {
          if (data !== ERROR_MSG && data.error === undefined) {
            dispatch(roomSuccess(data, ROOM_UPDATED));
          } else if (data.error !== undefined) {
            dispatch(roomFailure(data.error));
          } else {
            dispatch(roomFailure(data));
          }
        } else {
          dispatch(roomFailure('No data Received'));
        }
        console.log('Get Room', data);
      });
    }
  };
};
