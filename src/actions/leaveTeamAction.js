import { ERROR_MSG, TEAM_LEFT } from '../utils/constants';
import { teamRequest, teamSuccess, teamFailure } from './teamActions';

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
