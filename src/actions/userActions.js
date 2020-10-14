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
  UPDATE_ACCOUNT_LOADING,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAIL,
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  USERNAME_CHECK_LOADING,
  USERNAME_CHECK_SUCCESS,
  USERNAME_CHECK_FAIL,
  ACTION_RESET,
} from './types';
import jwt from 'jsonwebtoken';
import loggedInAxios from '../helpers/loggedInAxios';
import loggedOutAxios from '../helpers/loggedOutAxios';

export const actionReset = () => {
  return {
    type: ACTION_RESET,
  };
};

// Login user
export const loginUser = (authData) => (dispatch) => {
  dispatch({
    type: LOGIN_LOADING,
  });

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
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error.response);
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response
          ? error.response.data
          : 'Some error occurred! Please check if you have an active internet connection',
      });
    });
};

// Sign up user
export const signUpUser = (authData) => (dispatch) => {
  dispatch({
    type: SIGNUP_LOADING,
  });

  loggedOutAxios
    .post('/users/signup', authData)
    .then((response) => {
      console.log(response);
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: SIGNUP_FAIL,
        payload: error.response
          ? error.response.data
          : 'Some error occurred! Please check if you have an active internet connection',
      });
    });
};

// Delete account
export const deleteAccount = () => (dispatch) => {
  dispatch({
    type: DELETE_ACCOUNT_LOADING,
  });

  loggedInAxios()
    .delete('/users/delete')
    .then((response) => {
      console.log(response);
      dispatch({
        type: DELETE_ACCOUNT_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: DELETE_ACCOUNT_FAIL,
        payload: error.response
          ? error.response.data
          : 'Some error occurred! Please check if you have an active internet connection',
      });
    });
};

// Update account info
export const updateAccount = (newAccountData) => (dispatch) => {
  console.log(newAccountData);
  dispatch({
    type: UPDATE_ACCOUNT_LOADING,
  });

  loggedInAxios()
    .patch('/users/update', newAccountData)
    .then((response) => {
      console.log(response);
      dispatch({
        type: UPDATE_ACCOUNT_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: UPDATE_ACCOUNT_FAIL,
        payload: error.response
          ? error.response.data
          : 'Some error occurred! Please check if you have an active internet connection',
      });
    });
};

// Logout user
export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_LOADING,
  });

  loggedInAxios()
    .get('/users/logout')
    .then((response) => {
      console.log(response);
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: LOGOUT_FAIL,
        payload: error.response
          ? error.response.data
          : 'Some error occurred! Please check if you have an active internet connection',
      });
    });
};

//  Check userName avaiability
export const userNameCheck = (userName) => (dispatch) => {
  dispatch({
    type: USERNAME_CHECK_LOADING,
  });

  loggedInAxios()
    .get(`/users/username?userName=${userName}`)
    .then((response) => {
      console.log(response);
      dispatch({
        type: USERNAME_CHECK_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: USERNAME_CHECK_FAIL,
        payload: error.response
          ? error.response.data
          : 'Some error occurred! Please check if you have an active internet connection',
      });
    });
};
