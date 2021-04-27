import {
  ARENA_QUESTIONS_LOADING,
  ARENA_QUESTIONS_SUCCESS,
  ARENA_QUESTIONS_FAIL,
  ARENA_COMPETITION_STOPPED,
} from './types';
import qapiAxios from '../helpers/qapiAxios';
import { SERVER_DOWN } from '../utils/constants';

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

// Listener to when the competition has stopped
export const competitionStopped = (socket) => (dispatch) => {
  socket.off('COMPETITION_STOPPED').on('COMPETITION_STOPPED', (data) => {
    dispatch({
      type: ARENA_COMPETITION_STOPPED,
      payload: data.scoreboard,
    });
  });
};

export const submitCode = (socket, submittedCodeData) => (dispatch) => {
  console.log(submittedCodeData);
  socket.emit('CODE_SUBMISSION', submittedCodeData, (data) => {
    console.log(data);
  });
};

// Listener for checking submitted question solution status
export const codeSubmittedStatus = (socket) => (dispatch) => {
  socket.off('CODE_SUBMITTED').on('CODE_SUBMITTED', (data) => {
    console.log(data);
  });
};

// Listener to when someone in room submits right solution
export const roomCodeSubmissionSuccess = (socket) => (dispatch) => {
  socket.off('SUCCESSFULLY_SUBMITTED').on('SUCCESSFULLY_SUBMITTED', (data) => {
    console.log(data);
  });
};
