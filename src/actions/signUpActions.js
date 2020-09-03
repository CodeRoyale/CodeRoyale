import { SIGNUP_LOADING, SIGNUP_SUCCESS, SIGNUP_FAIL } from './types';

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
const SIGNUP_API = `${process.env.REACT_APP_USER_API_URL}/users/signup`;

export const signUpUser = (authData) => (dispatch) => {
  dispatch({
    type: SIGNUP_LOADING,
  });
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
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: jsonRes,
      });
    })
    .catch((err) => {
      dispatch({
        type: SIGNUP_FAIL,
        payload: err.message,
      });
    });
};
