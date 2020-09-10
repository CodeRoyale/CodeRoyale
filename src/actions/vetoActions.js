import {
  VETO_START_ADMIN,
  VETO_START_SERVER,
  VETO_STOP_SERVER,
  VETO_QUESTIONS_LOADING,
  VETO_QUESTIONS_SUCCESS,
  VETO_QUESTIONS_FAIL,
} from './types';

const vetoStartAdmin = () => {
  return {
    type: VETO_START_ADMIN,
  };
};

const vetoStartServer = (data) => {
  return {
    type: VETO_START_SERVER,
    payload: data,
  };
};

const vetoQuestionsLoading = () => {
  return {
    type: VETO_QUESTIONS_LOADING,
  };
};

const vetoQuestionsSuccess = (data) => {
  return {
    type: VETO_QUESTIONS_SUCCESS,
    payload: data,
  };
};

const vetoQuestionsFail = (data) => {
  return {
    type: VETO_QUESTIONS_FAIL,
    payload: data,
  };
};

const vetoStopServer = (data) => {
  return {
    type: VETO_STOP_SERVER,
    payload: data,
  };
};

export const veto = (socket) => (dispatch) => {
  dispatch(vetoStartAdmin());
  socket.emit('START_COMPETITION', {}, (data) => {
    if (!data.error) {
      console.log('works err');
      socket.on('VETO_START', (data) => {
        console.log(data);
        dispatch(vetoStartServer(data));
      });
      socket.on('VETO_STOP', (data) => {
        dispatch(vetoStopServer(data));
        console.log(data);
      });
    } else {
      console.log('error');
    }
  });
};

export const vetoVoting = (socket, votes) => (dispatch) => {
  socket.emit('VETO_VOTES', { votes }, (data) => {
    console.log(data);
  });
};
