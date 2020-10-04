import {
  LOGIN_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  DELETE_ACCOUNT_LOADING,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAIL,
  ACTION_RESET,
} from './types';
import jwt from 'jsonwebtoken';
import loggedInAxios from '../helpers/loggedInAxios';
import loggedOutAxios from '../helpers/loggedOutAxios';

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

const signUpRequest = () => {
  return {
    type: SIGNUP_LOADING,
  };
};

const signUpSuccess = (data) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: data.data,
  };
};

const signUpFail = (error) => {
  return {
    type: SIGNUP_FAIL,
    payload: error.response.data,
  };
};

const deleteAccountRequest = () => {
  return {
    type: DELETE_ACCOUNT_LOADING,
  };
};

const deleteAccountSuccess = (data) => {
  return {
    type: DELETE_ACCOUNT_SUCCESS,
    payload: data.data,
  };
};

const deleteAccountFail = (error) => {
  return {
    type: DELETE_ACCOUNT_FAIL,
    payload: error.response.data,
  };
};

export const actionReset = () => {
  return {
    type: ACTION_RESET,
  };
};

export const loginUser = (authData) => (dispatch) => {
  dispatch(loginRequest());

  const thirdPartyData = {
    issuer: authData.issuer,
    access_token: authData.access_token,
  };

  loggedOutAxios
    .post('/users/login', thirdPartyData)
    .then((response) => {
      console.log(response);
      console.log(jwt.decode(response.data.payload.accessToken));
      // Temporary storing in localStorage in actions will change
      localStorage.setItem(
        'user-data',
        JSON.stringify(jwt.decode(response.data.payload.accessToken))
      );
      localStorage.token = response.data.payload.accessToken;
      dispatch(loginSuccess(response));
    })
    .catch((error) => {
      console.log(error.response.data);
      dispatch(loginFail(error));
    });
};

export const signUpUser = (authData) => (dispatch) => {
  dispatch(signUpRequest());

  loggedOutAxios
    .post('/users/signup', authData)
    .then((response) => {
      console.log(response);
      dispatch(signUpSuccess(response));
    })
    .catch((error) => {
      console.log(error);
      dispatch(signUpFail(error));
    });
};

export const deleteAccount = (history) => (dispatch) => {
  dispatch(deleteAccountRequest());

  loggedInAxios(history)
    .delete('/users/delete')
    .then((response) => {
      console.log(response);
      dispatch(deleteAccountSuccess(response));
    })
    .catch((error) => {
      console.log(error);
      dispatch(deleteAccountFail(error));
    });
};
