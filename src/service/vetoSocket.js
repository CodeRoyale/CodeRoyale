/* eslint-disable consistent-return */
export const startCompetition = (socket, cb) => {
  if (!socket) return false;

  // Sending callback that competition start req is initiated by admin
  cb(null, 'Starting competition');
  socket.emit('START_COMPETITION', {}, (data) => {
    if (data.error !== undefined) {
      // Error in starting competition
      return cb(data.error, null);
    }
  });
};

export const vetoStart = (socket, cb) => {
  if (!socket) return false;

  socket.off('VETO_START').on('VETO_START', (data) => {
    if (data) {
      // Veto start success
      return cb(null, data);
    }
    // Veto start fail
    return cb(data, null);
  });
};

export const vetoVote = (socket, { votes }, cb) => {
  if (!socket) return false;

  socket.emit('VETO_VOTES', { votes }, (data) => {
    if (data) {
      // Veto voting success
      return cb(null, data);
    }
    // Veto voting fail
    return cb('Voting failed', null);
  });
};

export const vetoStop = (socket, cb) => {
  if (!socket) return false;

  socket.off('VETO_STOP').on('VETO_STOP', (data) => {
    if (data) {
      // Veto stop success
      return cb(null, data);
    }
    // Veto stop fail
    return cb(data, null);
  });
};

export const vetoStatus = (socket, cb) => {
  if (!socket) return false;

  socket.off('USER_VOTED').on('USER_VOTED', (data) => {
    if (data) {
      // User voted success
      return cb(null, data);
    }
    // User voted fail
    return cb(data, null);
  });
};
