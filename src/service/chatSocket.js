/* eslint-disable consistent-return */
export const sendEveryoneMsg = (socket, { message }, cb) => {
  if (!socket) return false;

  socket.emit('SEND_MSG', { content: message }, (data) => {
    /* 
      - data returns with true if message sent successfully
      - data returns with false if message fail to send successfully
    */
    if (data) {
      // Chat success
      return cb(null, { message: message, source: 'You' });
    }
    // Chat fail
    return cb('Chat failed');
  });
};

export const sendTeamMsg = (socket, { message }, cb) => {
  if (!socket) return false;

  socket.emit('SEND_MSG', { content: message, toTeam: true }, (data) => {
    /*
        - data returns with true if message sent successfully
        - data returns with false if message fail to send successfully
    */
    if (data) {
      // Chat success
      return cb(null, { message: message, source: 'You' });
    }
    // Chat fail
    return cb('Chat failed');
  });
};

export const subscribeToChat = (socket, cb) => {
  if (!socket) return false;

  socket.off('RCV_MSG').on('RCV_MSG', (data) => {
    if (data && data.content !== undefined) {
      if (data.toTeam) {
        // Team Chat
        return cb(null, {
          type: 'team',
          message: data.content,
          source: data.userName,
        });
      }
      // Everyone Chat
      return cb(null, {
        type: 'everyone',
        message: data.content,
        source: data.userName,
      });
    }
    // Chat fail
    return cb('Chat failed');
  });
};
