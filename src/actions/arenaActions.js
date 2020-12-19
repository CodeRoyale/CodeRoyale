import {
  ARENA_QUESTIONS_LOADING,
  ARENA_QUESTIONS_SUCCESS,
  ARENA_QUESTIONS_FAIL,
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
