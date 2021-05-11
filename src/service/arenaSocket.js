export const competitionStarted = (socket, cb) => {
  if (!socket) return false;

  socket.off('COMPETITION_STARTED').on('COMPETITION_STARTED', (data) => {
    if (data) {
      // Competition started success
      return cb(null, data);
    }
    // Competition started fail
    return cb('Competition started fail', null);
  });
};

export const competitionStopped = (socket, cb) => {
  if (!socket) return false;

  socket.off('COMPETITION_STOPPED').on('COMPETITION_STOPPED', (data) => {
    if (data) {
      // Competition stopped success
      return cb(null, data);
    }
    // Competition stopped fail
    return cb('Competition stopped fail', null);
  });
};

export const submitCode = (socket, codeSubmissionData, cb) => {
  if (!socket) return false;

  socket.emit('CODE_SUBMISSION', codeSubmissionData);

  return cb(null, 'Code submitted');
};

export const userCodeSubmittedStatus = (socket, cb) => {
  if (!socket) return false;

  socket.off('CODE_SUBMITTED').on('CODE_SUBMITTED', (data) => {
    console.log(data);
    if (data.sucess) {
      return cb(null, data);
    }
    return cb(data, null);
  });
};

export const roomCodeSubmissionSuccess = (socket, cb) => {
  if (!socket) return false;

  socket.off('SUCCESSFULLY_SUBMITTED').on('SUCCESSFULLY_SUBMITTED', (data) => {
    if (data) {
      return cb(null, data);
    }
    return cb('Room code submission fail', null);
  });
};
