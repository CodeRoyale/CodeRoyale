import { LOGIN_LOADING, LOGIN_FAIL, LOGIN_SUCCESS } from './types';

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
const LOGIN_API = `${process.env.REACT_APP_USER_API_URL}/users/login`;

export const loginUser = (authData) => (dispatch) => {
  dispatch({
    type: LOGIN_LOADING,
  });
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Origin', CLIENT_URL);
  headers.append('Access-Control-Allow-Credentials', 'true');

  const thirdPartyData = {
    issuer: authData.issuer,
    access_token: authData.access_token,
  };

  fetch(LOGIN_API, {
    method: 'POST',
    headers,
    body: JSON.stringify(thirdPartyData),
  })
    .then((res) => res.json())
    .then((jsonRes) => {
      // Temporary storing in localStorage in actions will change
      localStorage.setItem('user-data', JSON.stringify(jsonRes));
      localStorage.setItem('access-token', jsonRes.accessToken);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: jsonRes,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.message,
      });
    });
};
