import { ERROR_MSG, TEAM_CREATED } from '../utils/constants';
import { teamRequest, teamSuccess, teamFailure } from './teamActions';

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
