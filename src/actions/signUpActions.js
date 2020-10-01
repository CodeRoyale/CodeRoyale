import { SIGNUP_LOADING, SIGNUP_SUCCESS, SIGNUP_FAIL } from './types';
import axiosInstance from '../helpers/userAPIHelper';

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

  axiosInstance
    .post('/users/signup', authData)
    .then((jsonRes) => {
      console.log(jsonRes);
      dispatch(signUpSuccess(jsonRes));
    })
    .catch((err) => {
      console.log(err);
      dispatch(signUpFail(err));
    });
};
