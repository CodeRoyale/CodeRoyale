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

// Send chat message
export const sendMsg = (socket, { message }) => (dispatch) => {
  if (socket !== null) {
    socket.emit('SEND_MSG', { content: message }, (data) => {
      /* 
        - data returns with true if message sent successfully
        - data returns with false if message fail to send successfully
      */
      if (data) {
        dispatch(
          chatSuccess({ message: message, color: 'green', source: 'You' })
        );
      } else {
        dispatch(chatFailure('ERROR: DATA NULL'));
      }
    });
  }
};
