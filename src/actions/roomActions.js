import { ROOM_LOADING, ROOM_SUCCESS, ROOM_FAIL } from './types';
import {
  ERROR_MSG,
  ROOM_CREATED,
  ROOM_JOINED,
  ROOM_CLOSED,
  ROOM_UPDATED,
} from '../utils/constants';

// Create a room
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

// Join a room using room_id
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

// Close a room
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

// Get room data using room_id
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

// Listener for room closed
export const roomClosed = (socket) => (dispatch) => {
  socket.off('ROOM_CLOSED').on('ROOM_CLOSED', (data) => {
    if (data !== null) {
      dispatch({
        type: ROOM_SUCCESS,
        payload: null,
        action: ROOM_CLOSED,
      });
    } else {
      dispatch({
        type: ROOM_FAIL,
        payload: data,
      });
    }
  });
};
