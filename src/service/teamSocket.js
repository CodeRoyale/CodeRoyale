/* eslint-disable consistent-return */
import { ERROR_MSG } from '../utils/constants';

export const createTeam = (socket, { teamName }, cb) => {
  if (!socket) return false;

  socket.emit('CREATE_TEAM', { team_name: teamName }, (data) => {
    if (data) {
      if (data !== ERROR_MSG) {
        // Create team success
        return cb(null, data);
      }
      // Create team fail
      return cb(data, null);
    }
    return cb('No response from server', null);
  });
};

export const joinTeam = (socket, { teamName }, cb) => {
  if (!socket) return false;

  socket.emit('JOIN_TEAM', { team_name: teamName }, (data) => {
    if (data) {
      if (data !== ERROR_MSG) {
        // Join team success
        return cb(null, data);
      }
      // Join team fail
      return cb(data, null);
    }
    return cb('No response from server', null);
  });
};

export const leaveTeam = (socket, cb) => {
  if (!socket) return false;

  socket.emit('LEAVE_TEAM', {}, (data) => {
    if (data) {
      if (data !== ERROR_MSG) {
        // Leave team success
        return cb(null, data);
      }
      // Leave team fail
      return cb(data, null);
    }
    return cb('No response from server', null);
  });
};
