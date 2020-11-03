import io from 'socket.io-client';
import profileData from '../utils/examples';
import { chatSuccess, chatFailure } from './chatActions';
import { roomSuccess, roomFailure } from './roomActions';
import {
  SOCKET_LOADING,
  SOCKET_SUCCESS,
  SOCKET_FAIL,
  CONNECTION_ACK,
  CONNECTION_DENY,
} from './types';
import { ROOM_CLOSED } from '../utils/constants';
const ENDPOINT = process.env.REACT_APP_LOBBY_SERVER;
const userName = profileData.username;

const requestSocketConnection = () => {
  return {
    type: SOCKET_LOADING,
  };
};
const socketConnectionSuccess = (socket) => {
  return {
    type: SOCKET_SUCCESS,
    payload: socket,
  };
};

const socketConnectionFailure = (error) => {
  return {
    type: SOCKET_FAIL,
    payload: error,
  };
};

// Async Action to connect to socket...
export const connectSocket = () => {
  return (dispatch) => {
    dispatch(requestSocketConnection());
    const options = {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        },
      },
    };
    let socket = io.connect(ENDPOINT, options);
    socket.on(CONNECTION_ACK, () => {
      console.log(CONNECTION_ACK);
      dispatch(socketConnectionSuccess(socket));
    });
    socket.on(CONNECTION_DENY, () => {
      console.log(CONNECTION_DENY);
      dispatch(socketConnectionFailure(CONNECTION_DENY));
    });

    // On Message receive...
    socket.on('RCV_MSG', (data) => {
      if (data !== null && data.content !== undefined) {
        dispatch(
          chatSuccess({
            message: data.content,
            color: 'red',
            source: data.userName,
          })
        );
      } else {
        dispatch(chatFailure('No chat Came'));
      }
      console.log('chat data', data);
    });

    // On Close room
    socket.on('ROOM_CLOSED', (data) => {
      if (data !== null) {
        dispatch(roomSuccess(null, ROOM_CLOSED));
      } else {
        dispatch(roomFailure(data));
      }
    });
  };
};
