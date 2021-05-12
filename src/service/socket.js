/* eslint-disable consistent-return */
import io from 'socket.io-client';

/* eslint-disable import/prefer-default-export */
export const socketConnection = (cb) => {
  const home = 'joel';
  const joel = 'joel';
  const test = 'joel';
  const options = {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      },
    },
  };

  const socket = io.connect(process.env.REACT_APP_LOBBY_SERVER, options);

  if (!socket) return false;

  if (socket) {
    socket.on('CONNECTION_ACK', () =>
      cb(null, { message: 'CONNECTION_ACK', socket })
    );
    socket.on('CONNECTION_DENY', () =>
      cb(null, { message: 'CONNECTION_DENY' })
    );
  }
};
