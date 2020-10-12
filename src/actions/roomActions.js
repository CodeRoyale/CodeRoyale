import { ROOM_LOADING, ROOM_SUCCESS, ROOM_FAIL } from './types';
import {
  ERROR_MSG,
  ROOM_CREATED,
  ROOM_JOINED,
  ROOM_CLOSED,
  ROOM_UPDATED,
} from '../utils/constants';

export const roomRequest = () => {
  return {
    type: ROOM_LOADING,
  };
};
export const roomSuccess = (data, action) => {
  return {
    type: ROOM_SUCCESS,
    payload: data,
    action,
  };
};

export const roomFailure = (error) => {
  return {
    type: ROOM_FAIL,
    payload: error,
  };
};

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
    if (socket !== null) {
      dispatch(roomRequest());
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
          if (data !== null) {
            if (data !== ERROR_MSG) {
              dispatch(roomSuccess(data, ROOM_CREATED));
              const room_id = data.config.id;
              socket.on('ROOM_UPDATED', (data) => {
                if (data !== null && data.type !== undefined) {
                  dispatch(getRoom(socket, { room_id }));
                }
              });
              
              // Saving room_id in localStorage...
              localStorage.setItem('room_id', room_id);

              // On Submitting code...
              // This is not the right way... we have to make a reducer to keep track of all the submissions...
              socket.on('CODE_SUBMITTED', (data) => {
                console.log('code res:', data);
                dispatch(getRoom(socket, { room_id }));
              });

              //On Successful submission of code...
              //This is not the right way... we have to make a reducer to keep track of all the submissions...
              socket.on('SUCCESSFULLY_SUBMITTED', (data) => {
                console.log('TestCase passed', data);
                dispatch(getRoom(socket, { room_id }));
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
    } else {
      dispatch(roomFailure('Server not connected...'));
    }
  };
};

export const joinRoom = (socket, { room_id }) => {
  return (dispatch) => {
    if (socket !== null) {
      dispatch(roomRequest());
      socket.emit('JOIN_ROOM', { room_id }, (data) => {
        if (data !== null) {
          if (data !== ERROR_MSG && data.error === undefined) {
            dispatch(roomSuccess(data, ROOM_JOINED));
            socket.on('ROOM_UPDATED', (data) => {
              if (data !== null && data.type !== undefined) {
                dispatch(getRoom(socket, { room_id }));
              }
            });
            // Saving room_id in localStorage...
            localStorage.setItem('room_id', room_id);

            // On Submitting code...
            // This is not the right way... we have to make a reducer to keep track of all the submissions...
            socket.on('CODE_SUBMITTED', (data) => {
              console.log('code res:', data);
              dispatch(getRoom(socket, { room_id }));
            });

            //On Successful submission of code...
            //This is not the right way... we have to make a reducer to keep track of all the submissions...
            socket.on('SUCCESSFULLY_SUBMITTED', (data) => {
              console.log('TestCase passed', data);
              dispatch(getRoom(socket, { room_id }));
            });
          } else if (data.error !== undefined) {
            dispatch(roomFailure(data.error));
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

export const closeRoom = (socket) => {
  return (dispatch) => {
    if (socket !== null) {
      dispatch(roomRequest());
      socket.emit('CLOSE_ROOM', {}, (data) => {
        if (data !== null) {
          if (data !== ERROR_MSG && data.error === undefined) {
            dispatch(roomSuccess(null, ROOM_CLOSED));
            localStorage.removeItem('room_id');
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
