import io from 'socket.io-client';

export const socketConnection = (cb) => {
  const options = {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      },
    },
  };

  let socket = io.connect(process.env.REACT_APP_LOBBY_SERVER, options);

  if (!socket) return false;

  if (socket) {
    socket.on('CONNECTION_ACK', () => {
      return cb(null, { message: 'CONNECTION_ACK', socket });
    });
    socket.on('CONNECTION_DENY', () => {
      return cb(null, { message: 'CONNECTION_DENY' });
    });
  }
};
