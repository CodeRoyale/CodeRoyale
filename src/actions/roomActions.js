import { ROOM_LOADING, ROOM_SUCCESS, ROOM_FAIL } from './types';
import {
  ERROR_MSG,
  ROOM_CREATED,
  ROOM_JOINED,
  ROOM_CLOSED,
  ROOM_UPDATED,
} from '../utils/constants';

const codeSubmit = (socket, room_id, dispatch) => {
  // On Submitting code...
  socket.on('CODE_SUBMITTED', (data) => {
    // TODO: This data has to be shown after compilation...
    console.log('code res:', data);
    alert(data.sucess ? 'All test case passed' : 'Test cases has not passed');
    dispatch(getRoom(socket, { room_id }));
  });

  //On Successful submission of code...
  socket.on('SUCCESSFULLY_SUBMITTED', (data) => {
    console.log('TestCase passed', data);
    dispatch(getRoom(socket, { room_id }));
  });
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
) => (dispatch) => {
  if (socket !== null) {
    dispatch({
      type: ROOM_LOADING,
    });
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
            dispatch({
              type: ROOM_SUCCESS,
              payload: data,
              action: ROOM_CREATED,
            });
            const room_id = data.config.id;
            socket.on('ROOM_UPDATED', (data) => {
              if (data !== null && data.type !== undefined) {
                dispatch(getRoom(socket, { room_id }));
              }
            });

            // On submitting code...
            codeSubmit(socket, room_id, dispatch);
          } else {
            dispatch({
              type: ROOM_FAIL,
              payload: data,
            });
          }
        } else {
          dispatch({
            type: ROOM_FAIL,
            payload: 'No data Received',
          });
        }
        console.log('Create Room', data);
      }
    );
  } else {
    dispatch({
      type: ROOM_FAIL,
      payload: 'Not connected to the server',
    });
  }
};

export const joinRoom = (socket, { room_id }) => (dispatch) => {
  if (socket !== null) {
    dispatch({
      type: ROOM_LOADING,
    });
    socket.emit('JOIN_ROOM', { room_id }, (data) => {
      if (data !== null) {
        if (data !== ERROR_MSG && data.error === undefined) {
          dispatch({
            type: ROOM_SUCCESS,
            payload: data,
            action: ROOM_JOINED,
          });
          socket.on('ROOM_UPDATED', (data) => {
            if (data !== null && data.type !== undefined) {
              dispatch(getRoom(socket, { room_id }));
            }
          });

          // On submitting code...
          codeSubmit(socket, room_id, dispatch);
        } else if (data.error !== undefined) {
          dispatch({
            type: ROOM_FAIL,
            payload: data.error,
          });
        } else {
          dispatch({
            type: ROOM_FAIL,
            payload: data,
          });
        }
      } else {
        dispatch({
          type: ROOM_FAIL,
          payload: 'No data Received',
        });
      }
      console.log('Join Room', data);
    });
  } else {
    dispatch({
      type: ROOM_FAIL,
      payload: 'Not connected to the server',
    });
  }
};

export const closeRoom = (socket) => (dispatch) => {
  if (socket !== null) {
    dispatch({
      type: ROOM_LOADING,
    });
    socket.emit('CLOSE_ROOM', {}, (data) => {
      if (data !== null) {
        if (data !== ERROR_MSG && data.error === undefined) {
          dispatch({
            type: ROOM_SUCCESS,
            payload: null,
            action: ROOM_CLOSED,
          });
        } else if (data.error !== undefined) {
          dispatch({
            type: ROOM_FAIL,
            payload: data.error,
          });
        } else {
          dispatch({
            type: ROOM_FAIL,
            payload: data,
          });
        }
      } else {
        dispatch({
          type: ROOM_FAIL,
          payload: 'No data Received',
        });
      }
      console.log('Close Room', data);
    });
  } else {
    dispatch({
      type: ROOM_FAIL,
      payload: 'Not connected to the server',
    });
  }
};

export const getRoom = (socket, { room_id }) => (dispatch) => {
  if (socket !== null) {
    dispatch({
      type: ROOM_LOADING,
    });
    socket.emit('GET_ROOM', { room_id }, (data) => {
      if (data !== null) {
        if (data !== ERROR_MSG && data.error === undefined) {
          dispatch({
            type: ROOM_SUCCESS,
            payload: data,
            action: ROOM_UPDATED,
          });
        } else if (data.error !== undefined) {
          dispatch({
            type: ROOM_FAIL,
            payload: data.error,
          });
        } else {
          dispatch({
            type: ROOM_FAIL,
            payload: data,
          });
        }
      } else {
        dispatch({
          type: ROOM_FAIL,
          payload: 'No data Received',
        });
      }
      console.log('Get Room', data);
    });
  }
};
