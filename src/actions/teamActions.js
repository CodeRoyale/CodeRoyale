import { TEAM_LOADING, TEAM_SUCCESS, TEAM_FAIL, ACTION_RESET } from './types';
import {
  ERROR_MSG,
  TEAM_CREATED,
  TEAM_JOINED,
  TEAM_LEFT,
} from '../utils/constants';

const teamRequest = () => {
  return {
    type: TEAM_LOADING,
  };
};
const teamSuccess = (data, action) => {
  return {
    type: TEAM_SUCCESS,
    payload: data,
    action: action,
  };
};

const teamFailure = (error, action) => {
  return {
    type: TEAM_FAIL,
    payload: error,
  };
};

export const resetTeamAction = () => {
  return {
    type: ACTION_RESET,
    action: '',
  };
};

export const createTeam = (socket, { team_name }) => {
  return (dispatch) => {
    if (socket !== null) {
      dispatch(teamRequest());
      socket.emit('CREATE_TEAM', { team_name }, (data) => {
        if (data !== null) {
          if (data !== ERROR_MSG && data.error === undefined) {
            dispatch(teamSuccess(data, TEAM_CREATED));
          } else if (data.error !== undefined) {
            dispatch(teamFailure(data.error));
          } else {
            dispatch(teamFailure(data));
          }
        } else {
          dispatch(teamFailure('No data Received'));
        }
        console.log('Create Team', data);
      });
    } else {
      dispatch(teamFailure('Server not connected...'));
    }
  };
};

export const joinTeam = (socket, { team_name }) => {
  return (dispatch) => {
    if (socket !== null) {
      dispatch(teamRequest());
      socket.emit('JOIN_TEAM', { team_name }, (data) => {
        if (data !== null) {
          if (data !== ERROR_MSG && data.error === undefined) {
            dispatch(teamSuccess(data, TEAM_JOINED));
          } else if (data.error !== undefined) {
            dispatch(teamFailure(data.error));
          } else {
            dispatch(teamFailure(data));
          }
        } else {
          dispatch(teamFailure('No data Received'));
        }
        console.log('Join Team', data);
      });
    } else {
      dispatch(teamFailure('Server not connected...'));
    }
  };
};

export const leaveTeam = (socket) => {
  return (dispatch) => {
    if (socket !== null) {
      dispatch(teamRequest());
      socket.emit('LEAVE_TEAM', {}, (data) => {
        if (data !== null) {
          if (data !== ERROR_MSG && data.error === undefined) {
            dispatch(teamSuccess(data, TEAM_LEFT));
          } else if (data.error !== undefined) {
            dispatch(teamFailure(data.error));
          } else {
            dispatch(teamFailure(data));
          }
        } else {
          dispatch(teamFailure('No data Received'));
        }
        console.log('Leave Team', data);
      });
    } else {
      dispatch(teamFailure('Server not connected...'));
    }
  };
};
