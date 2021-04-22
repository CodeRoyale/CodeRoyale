import {
  SOCKET_LOADING,
  SOCKET_SUCCESS,
  SOCKET_FAIL,
  CONNECTION_ACK,
  CONNECTION_DENY,
} from './types';
import io from 'socket.io-client';
const LOBBY_SERVER = process.env.REACT_APP_LOBBY_SERVER;

// Connection to socket server
export const connectSocket = () => (dispatch) => {
  dispatch({
    type: SOCKET_LOADING,
  });
  const options = {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      },
    },
  };
  let socket = io.connect(LOBBY_SERVER, options);
  socket.on(CONNECTION_ACK, () => {
    console.log(CONNECTION_ACK);
    dispatch({
      type: SOCKET_SUCCESS,
      payload: socket,
    });
  });
  socket.on(CONNECTION_DENY, () => {
    console.log(CONNECTION_DENY);
    dispatch({
      type: SOCKET_FAIL,
      payload: CONNECTION_DENY,
    });
  });
};
