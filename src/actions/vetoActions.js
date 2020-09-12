import {
  VETO_START_ADMIN,
  VETO_START_SERVER,
  VETO_STOP_SERVER,
  VETO_QUESTIONS_LOADING,
  VETO_QUESTIONS_SUCCESS,
  VETO_QUESTIONS_FAIL,
  VETO_USER_VOTED,
  VETO_FAIL,
  ACTION_RESET,
} from './types';

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
const QUES_API = `${process.env.REACT_APP_DEV_SERVER}/questions/getQById`;

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

const vetoUserVoted = (data) => {
  return {
    type: VETO_USER_VOTED,
    payload: data,
  };
};

const vetoFail = (err) => {
  return {
    type: VETO_FAIL,
    payload: err,
  };
};

export const resetVetoAction = () => {
  return {
    type: ACTION_RESET,
  };
};

export const veto = (socket) => (dispatch) => {
  dispatch(vetoStartAdmin());
  socket.emit('START_COMPETITION', {}, (data) => {
    if (data.error !== undefined) {
      dispatch(vetoFail(data.error));
    }
  });

  dispatch(vetoStart(socket));

  dispatch(vetoStop(socket));
};

export const vetoStart = (socket) => (dispatch) => {
  socket.on('VETO_START', (data) => {
    dispatch(vetoStartServer(data));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Origin', CLIENT_URL);
    headers.append('Access-Control-Allow-Credentials', 'true');

    const quesIds = {
      id: data,
    };

    dispatch(vetoQuestionsLoading());
    fetch(QUES_API, {
      method: 'POST',
      headers,
      body: JSON.stringify(quesIds),
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        dispatch(vetoQuestionsSuccess(jsonRes));
      })
      .catch((err) => {
        dispatch(vetoQuestionsFail(err));
      });
  });
};

export const vetoVoting = (socket, votes) => (dispatch) => {
  socket.emit('VETO_VOTES', { votes }, (data) => {
    dispatch(vetoUserVoted(data));
  });
};

export const vetoStop = (socket) => (dispatch) => {
  socket.on('VETO_STOP', (data) => {
    dispatch(vetoStopServer(data));
  });
};
