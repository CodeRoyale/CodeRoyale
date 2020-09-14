import {
  CODE_SUBMIT_LOADING,
  CODE_SUBMIT_SUCCESS,
  CODE_SUBMIT_FAIL,
  ACTION_RESET,
} from './types';

export const codeSubmitRequest = () => {
  return {
    type: CODE_SUBMIT_LOADING,
  };
};

export const codeSubmitSuccess = (action) => {
  return {
    type: CODE_SUBMIT_SUCCESS,
    action: action,
  };
};
export const codeSubmitFailure = (error) => {
  return {
    type: CODE_SUBMIT_FAIL,
    payload: error,
  };
};

export const resetCodeSubmitAction = () => {
  return {
    type: ACTION_RESET,
    action: '',
  };
};
