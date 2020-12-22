import {
  CHAT_EVERYONE_SUCCESS,
  CHAT_TEAM_SUCCESS,
  CHAT_FAIL,
  SOCKET_LOADING,
  SOCKET_SUCCESS,
  SOCKET_FAIL,
  CONNECTION_ACK,
  CONNECTION_DENY,
} from './types';
import io from 'socket.io-client';
import { roomSuccess, roomFailure, getRoom } from './roomActions';
import { ROOM_CLOSED } from '../utils/constants';
const ENDPOINT = process.env.REACT_APP_LOBBY_SERVER;

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
    socket.on(CONNECTION_ACK, (userState) => {
      console.log(CONNECTION_ACK);
      if (userState.room_id) {
        const room_id = userState.room_id;
        dispatch(getRoom(socket, { room_id }));
      }
      dispatch(socketConnectionSuccess(socket));
    });
    socket.on(CONNECTION_DENY, () => {
      console.log(CONNECTION_DENY);
      dispatch(socketConnectionFailure(CONNECTION_DENY));
    });

    // On Message receive...
    socket.on('RCV_MSG', (data) => {
      if (data !== null && data.content !== undefined) {
        if (data.toTeam) {
          dispatch({
            type: CHAT_TEAM_SUCCESS,
            payload: {
              message: data.content,
              source: data.userName,
            },
          });
        } else {
          dispatch({
            type: CHAT_EVERYONE_SUCCESS,
            payload: {
              message: data.content,
              source: data.userName,
            },
          });
        }
      } else {
        dispatch({
          type: CHAT_FAIL,
          payload: 'No chat Came',
        });
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
