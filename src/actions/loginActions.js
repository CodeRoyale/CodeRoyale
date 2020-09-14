import { LOGIN_LOADING, LOGIN_FAIL, LOGIN_SUCCESS } from './types';

const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
const LOGIN_API = `${process.env.REACT_APP_USER_API_URL}/users/login`;

const loginRequest = () => {
  return {
    type: LOGIN_LOADING,
  };
};

const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

const loginFail = (data) => {
  return {
    type: LOGIN_FAIL,
    payload: data.message,
  };
};

export const loginUser = (authData) => (dispatch) => {
  dispatch(loginRequest());
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
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res;
    })
    .then((res) => res.json())
    .then((jsonRes) => {
      // Temporary storing in localStorage in actions will change
      localStorage.setItem('user-data', JSON.stringify(jsonRes));
      localStorage.setItem('access-token', jsonRes.accessToken);
      dispatch(loginSuccess(jsonRes));
    })
    .catch((err) => {
      console.log(err);
      dispatch(loginFail(err));
    });
};
