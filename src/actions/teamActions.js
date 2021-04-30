import { TEAM_LOADING, TEAM_SUCCESS, TEAM_FAIL, ACTION_RESET } from './types';
import {
  ERROR_MSG,
  TEAM_CREATED,
  TEAM_JOINED,
  TEAM_LEFT,
} from '../utils/constants';

export const resetTeamAction = () => {
  return {
    type: ACTION_RESET,
    action: '',
  };
};

// Create a team in room
export const createTeam = (socket, { team_name }) => (dispatch) => {
  if (socket !== null) {
    dispatch({
      type: TEAM_LOADING,
    });
    socket.emit('CREATE_TEAM', { team_name }, (data) => {
      if (data !== null) {
        if (data !== ERROR_MSG && data.error === undefined) {
          dispatch({
            type: TEAM_SUCCESS,
            payload: data,
            action: TEAM_CREATED,
          });
        } else if (data.error !== undefined) {
          dispatch({
            type: TEAM_FAIL,
            payload: data.error,
          });
        } else {
          dispatch({
            type: TEAM_FAIL,
            payload: data,
          });
        }
      } else {
        dispatch({
          type: TEAM_FAIL,
          payload: 'No data Received',
        });
      }
      console.log('Create Team', data);
    });
  } else {
    dispatch({
      type: TEAM_FAIL,
      payload: 'Not connected to the server',
    });
  }
};

// Join a team in room
export const joinTeam = (socket, { team_name }) => (dispatch) => {
  if (socket !== null) {
    dispatch({
      type: TEAM_LOADING,
    });
    socket.emit('JOIN_TEAM', { team_name }, (data) => {
      if (data !== null) {
        if (data !== ERROR_MSG && data.error === undefined) {
          dispatch({
            type: TEAM_SUCCESS,
            payload: data,
            action: TEAM_JOINED,
          });
        } else if (data.error !== undefined) {
          dispatch({
            type: TEAM_FAIL,
            payload: data.error,
          });
        } else {
          dispatch({
            type: TEAM_FAIL,
            payload: data,
          });
        }
      } else {
        dispatch({
          type: TEAM_FAIL,
          payload: 'No data Received',
        });
      }
      console.log('Join Team', data);
    });
  } else {
    dispatch({
      type: TEAM_FAIL,
      payload: 'Not connected to the server',
    });
  }
};

// Leave a team in room
export const leaveTeam = (socket) => (dispatch) => {
  if (socket !== null) {
    dispatch({
      type: TEAM_LOADING,
    });
    socket.emit('LEAVE_TEAM', {}, (data) => {
      if (data !== null) {
        if (data !== ERROR_MSG && data.error === undefined) {
          dispatch({
            type: TEAM_SUCCESS,
            payload: data,
            action: TEAM_LEFT,
          });
        } else if (data.error !== undefined) {
          dispatch({
            type: TEAM_FAIL,
            payload: data.error,
          });
        } else {
          dispatch({
            type: TEAM_FAIL,
            payload: data,
          });
        }
      } else {
        dispatch({
          type: TEAM_FAIL,
          payload: 'No data Received',
        });
      }
      console.log('Leave Team', data);
    });
  } else {
    dispatch({
      type: TEAM_FAIL,
      payload: 'Not connected to the server',
    });
  }
};
