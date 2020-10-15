import {
  PRECHECK_LOADING,
  PRECHECK_SUCCESS,
  PRECHECK_FAIL,
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

export const userActionReset = () => {
  return {
    type: ACTION_RESET,
  };
};

// Precheck user
export const preCheckUser = (history) => (dispatch) => {
  dispatch({
    type: PRECHECK_LOADING,
  });
  loggedInAxios(history)
    .get('/precheck')
    .then((response) => {
      localStorage.setItem(
        'user-data',
        JSON.stringify(jwt.decode(response.data.payload.accessToken))
      );
      localStorage.token = response.data.payload.accessToken;
      dispatch({
        type: PRECHECK_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: PRECHECK_FAIL,
        payload: error.response
          ? error.response.data
          : 'Some error occurred! Please check if you have an active internet connection',
      });
    });
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
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: SIGNUP_FAIL,
        payload: error.response
          ? error.response.data
          : 'Some error occurred! Please check if you have an active internet connection',
      });
    });
};

// Delete account
export const deleteAccount = (history) => (dispatch) => {
  dispatch({
    type: DELETE_ACCOUNT_LOADING,
  });

  loggedInAxios(history)
    .delete('/users/delete')
    .then((response) => {
      localStorage.removeItem('token');
      dispatch({
        type: DELETE_ACCOUNT_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: DELETE_ACCOUNT_FAIL,
        payload: error.response
          ? error.response.data
          : 'Some error occurred! Please check if you have an active internet connection',
      });
    });
};

// Update account info
export const updateAccount = (history, newAccountData) => (dispatch) => {
  console.log(newAccountData);
  dispatch({
    type: UPDATE_ACCOUNT_LOADING,
  });

  loggedInAxios(history)
    .patch('/users/update', newAccountData)
    .then((response) => {
      localStorage.setItem(
        'user-data',
        JSON.stringify(jwt.decode(response.data.payload.accessToken))
      );
      localStorage.token = response.data.payload.accessToken;
      dispatch({
        type: UPDATE_ACCOUNT_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_ACCOUNT_FAIL,
        payload: error.response
          ? error.response.data
          : 'Some error occurred! Please check if you have an active internet connection',
      });
    });
};

// Logout user
export const logoutUser = (history) => (dispatch) => {
  console.log('running userActions check');
  dispatch({
    type: LOGOUT_LOADING,
  });

  loggedInAxios(history)
    .get('/users/logout')
    .then((response) => {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: LOGOUT_FAIL,
        payload: error.response
          ? error.response.data
          : 'Some error occurred! Please check if you have an active internet connection',
      });
    });
};

//  Check userName avaiability
export const userNameCheck = (history, userName) => (dispatch) => {
  dispatch({
    type: USERNAME_CHECK_LOADING,
  });

  loggedInAxios(history)
    .get(`/users/username?userName=${userName}`)
    .then((response) => {
      localStorage.setItem(
        'user-data',
        JSON.stringify(jwt.decode(response.data.payload.accessToken))
      );
      localStorage.token = response.data.payload.accessToken;
      dispatch({
        type: USERNAME_CHECK_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: USERNAME_CHECK_FAIL,
        payload: error.response
          ? error.response.data
          : 'Some error occurred! Please check if you have an active internet connection',
      });
    });
};
