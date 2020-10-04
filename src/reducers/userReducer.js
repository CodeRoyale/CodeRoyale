import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTION_RESET,
} from '../actions/types';

const initialState = {
  loginData: {
    isLoading: false,
  },
  signUpData: {
    isLoading: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loginData: {
          error: false,
          isLoading: true,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginData: {
          isLoading: false,
          data: action.payload,
          isLoggedIn: true,
        },
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginData: {
          isLoading: false,
          error: action.payload,
          isLoggedIn: false,
        },
      };
    case SIGNUP_LOADING:
      return {
        ...state,
        signUpData: {
          isLoading: true,
          error: false,
        },
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signUpData: {
          isLoading: false,
          data: action.payload,
        },
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        signUpData: {
          isLoading: false,
          error: action.payload,
        },
      };
    case ACTION_RESET:
      return {
        ...state,
        loginData: {
          error: false,
          data: false,
        },
        signUpData: {
          error: false,
          data: false,
        },
      };
    default:
      return state;
  }
}
