import {
  ARENA_QUESTIONS_LOADING,
  ARENA_QUESTIONS_SUCCESS,
  ARENA_QUESTIONS_FAIL,
} from './types';

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
const QUES_API = `${process.env.REACT_APP_DEV_SERVER}/questions/getQById`;

const questionRequest = () => {
  return {
    type: ARENA_QUESTIONS_LOADING,
  };
};

const questionSuccess = (data) => {
  return {
    type: ARENA_QUESTIONS_SUCCESS,
    payload: data,
  };
};

const questionFail = (data) => {
  return {
    type: ARENA_QUESTIONS_FAIL,
    payload: data,
  };
};

export const getQuestion = (questionIDs) => (dispatch) => {
  dispatch(questionRequest());
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Origin', CLIENT_URL);
  headers.append('Access-Control-Allow-Credentials', 'true');

  const quesIds = {
    id: questionIDs,
  };

  dispatch(questionRequest());
  fetch(QUES_API, {
    method: 'POST',
    headers,
    body: JSON.stringify(quesIds),
  })
    .then((res) => res.json())
    .then((jsonRes) => {
      dispatch(questionSuccess(jsonRes));
    })
    .catch((err) => {
      dispatch(questionFail(err));
    });
};
