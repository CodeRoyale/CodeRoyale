import {
  ARENA_QUESTIONS_LOADING,
  ARENA_QUESTIONS_SUCCESS,
  ARENA_QUESTIONS_FAIL,
  ARENA_COMPETITION_STARTED,
  ARENA_COMPETITION_STOPPED,
  ARENA_ROOM_CODE_SUBMIT_STATUS,
  ARENA_CODE_SUBMIT_LOADING,
  ARENA_CODE_SUBMIT_SUCCESS,
  ARENA_CODE_SUBMIT_FAIL,
  ARENA_DATA_RESET,
} from './types';
import qapiAxios from '../helpers/qapiAxios';
import { SERVER_DOWN } from '../utils/constants';

export const arenaDataReset = () => (dispatch) => {
  dispatch({
    type: ARENA_DATA_RESET,
  });
};

// Get question from qapi
export const getQuestion = (questionIDs) => (dispatch) => {
  dispatch({
    type: ARENA_QUESTIONS_LOADING,
  });

  // question ids to be sent to qapi
  const quesIds = {
    id: questionIDs,
  };

  qapiAxios()
    .post('/questions/getQById', quesIds)
    .then((response) => {
      dispatch({
        type: ARENA_QUESTIONS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error.response);
      dispatch({
        type: ARENA_QUESTIONS_FAIL,
        payload: error.response ? error.response.data : SERVER_DOWN,
      });
    });
};

export const competitionStarted = (socket) => (dispatch) => {
  socket.off('COMPETITION_STARTED').on('COMPETITION_STARTED', (data) => {
    dispatch({
      type: ARENA_COMPETITION_STARTED,
      payload: data,
    });
  });
};

// Listener to when the competition has stopped
export const competitionStopped = (socket) => (dispatch) => {
  socket.off('COMPETITION_STOPPED').on('COMPETITION_STOPPED', (data) => {
    dispatch({
      type: ARENA_COMPETITION_STOPPED,
      payload: data.scoreboard,
    });
  });
};

// Submit code to server
export const submitCode = (socket, submittedCodeData) => (dispatch) => {
  dispatch({
    type: ARENA_CODE_SUBMIT_LOADING,
  });
  socket.emit('CODE_SUBMISSION', submittedCodeData);
};

// Listener for checking submitted question solution status
export const codeSubmittedStatus = (socket) => (dispatch) => {
  socket.off('CODE_SUBMITTED').on('CODE_SUBMITTED', (data) => {
    console.log(data);
    if (data.sucess) {
      dispatch({
        type: ARENA_CODE_SUBMIT_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: ARENA_CODE_SUBMIT_FAIL,
        payload: data,
      });
    }
  });
};

// Listener to when someone in room submits right solution
export const roomCodeSubmissionSuccess = (socket) => (dispatch) => {
  socket.off('SUCCESSFULLY_SUBMITTED').on('SUCCESSFULLY_SUBMITTED', (data) => {
    dispatch({
      type: ARENA_ROOM_CODE_SUBMIT_STATUS,
      payload: data,
    });
  });
};
