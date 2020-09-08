import { SIGNUP_LOADING, SIGNUP_SUCCESS, SIGNUP_FAIL } from './types';

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
const SIGNUP_API = `${process.env.REACT_APP_USER_API_URL}/users/signup`;

const signUpRequest = () => {
  return {
    type: SIGNUP_LOADING,
  };
};

const signUpSuccess = (data) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: data,
  };
};

const signUpFail = (data) => {
  return {
    type: SIGNUP_FAIL,
    payload: data.message,
  };
};

export const signUpUser = (authData) => (dispatch) => {
  dispatch(signUpRequest());
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Origin', CLIENT_URL);
  headers.append('Access-Control-Allow-Credentials', 'true');

  fetch(SIGNUP_API, {
    method: 'POST',
    headers,
    body: JSON.stringify(authData),
  })
    .then((res) => res.json())
    .then((jsonRes) => {
      dispatch(signUpSuccess(jsonRes));
    })
    .catch((err) => {
      dispatch(signUpFail(err));
    });
};
