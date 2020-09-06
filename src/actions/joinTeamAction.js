import { ERROR_MSG, TEAM_JOINED } from '../utils/constants';
import { teamRequest, teamSuccess, teamFailure } from './teamActions';

export const joinTeam = (socket, { team_name }) => {
  return (dispatch) => {
    if (socket !== null) {
      dispatch(teamRequest());
      socket.emit('JOIN_TEAM', { team_name }, (data) => {
        if (data !== null) {
          if (data !== ERROR_MSG) {
            dispatch(teamSuccess(data, TEAM_JOINED));
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
