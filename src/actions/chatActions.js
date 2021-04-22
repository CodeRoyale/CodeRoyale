import {
  CHANGED_CHAT_TYPE,
  CHAT_EVERYONE_SUCCESS,
  CHAT_TEAM_SUCCESS,
  CHAT_FAIL,
} from './types';

// Change chat type from everyone to team or vice versa
export const changeChatType = (chatType) => (dispatch) => {
  dispatch({
    type: CHANGED_CHAT_TYPE,
    payload: chatType,
  });
};

// Send chat message to everyone in room
export const sendEveryoneMsg = (socket, { message }) => (dispatch) => {
  if (socket !== null) {
    socket.emit('SEND_MSG', { content: message }, (data) => {
      console.log('everyone self send', data);
      /* 
        - data returns with true if message sent successfully
        - data returns with false if message fail to send successfully
      */
      if (data) {
        dispatch({
          type: CHAT_EVERYONE_SUCCESS,
          payload: { message: message, source: 'You' },
        });
      } else {
        dispatch({
          type: CHAT_FAIL,
          payload: 'ERROR: DATA NULL',
        });
      }
    });
  }
};

// Send chat message to only team mates
export const sendTeamMsg = (socket, { message }) => (dispatch) => {
  if (socket !== null) {
    socket.emit('SEND_MSG', { content: message, toTeam: true }, (data) => {
      console.log('team self send', data);
      /*
        - data returns with true if message sent successfully
        - data returns with false if message fail to send successfully
      */
      if (data) {
        dispatch({
          type: CHAT_TEAM_SUCCESS,
          payload: { message: message, source: 'You' },
        });
      } else {
        dispatch({
          type: CHAT_FAIL,
          payload: 'ERROR: DATA NULL',
        });
      }
    });
  }
};

// Listener for new message received
export const receivedMsg = (socket) => (dispatch) => {
  socket.off('RCV_MSG').on('RCV_MSG', (data) => {
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
};
