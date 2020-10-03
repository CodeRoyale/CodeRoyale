import { LOGIN_LOADING, LOGIN_FAIL, LOGIN_SUCCESS } from './types';
import jwt from 'jsonwebtoken';
import axiosInstance from '../helpers/axiosInstance';

const loginRequest = () => {
  return {
    type: LOGIN_LOADING,
  };
};

const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data.data,
  };
};

const loginFail = (error) => {
  return {
    type: LOGIN_FAIL,
    payload: error.response.data,
  };
};

export const loginUser = (authData) => (dispatch) => {
  dispatch(loginRequest());

  const thirdPartyData = {
    issuer: authData.issuer,
    access_token: authData.access_token,
  };

  axiosInstance()
    .post('/users/login', thirdPartyData)
    .then((jsonRes) => {
      console.log(jsonRes);
      console.log(jwt.decode(jsonRes.data.payload.accessToken));
      // Temporary storing in localStorage in actions will change
      localStorage.setItem(
        'user-data',
        JSON.stringify(jwt.decode(jsonRes.data.payload.accessToken))
      );
      localStorage.token = jsonRes.data.payload.accessToken;
      dispatch(loginSuccess(jsonRes));
    })
    .catch((error) => {
      console.log(error);
      dispatch(loginFail(error));
    });
};
