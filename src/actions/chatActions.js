import { CHAT_SUCCESS, CHAT_FAIL } from './types';

export const chatSuccess = (data) => {
  return {
    type: CHAT_SUCCESS,
    payload: data,
  };
};

export const chatFailure = (error) => {
  return {
    type: CHAT_FAIL,
    payload: error,
  };
};

export const sendMsg = (socket, { message }) => (dispatch) => {
  if (socket !== null) {
    socket.emit('SEND_MSG', { content: message }, (data) => {
      if (data) {
        dispatch(
          chatSuccess({ message: message, color: 'green', source: 'YOU' })
        );
      } else {
        dispatch(chatFailure('ERROR: DATA NULL'));
      }
    });
  }
};
