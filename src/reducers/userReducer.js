import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  DELETE_ACCOUNT_LOADING,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAIL,
  UPDATE_ACCOUNT_LOADING,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAIL,
  ACTION_RESET,
} from '../actions/types';

const initialState = {
  loginData: {
    isLoading: false,
  },
  signUpData: {
    isLoading: false,
  },
  deleteAccountData: {
    isLoading: false,
  },
  updateAccountData: {
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
    case DELETE_ACCOUNT_LOADING:
      return {
        ...state,
        deleteAccountData: {
          isLoading: true,
          error: false,
        },
      };
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        deleteAccountData: {
          isLoading: false,
          data: action.payload,
        },
      };
    case DELETE_ACCOUNT_FAIL:
      return {
        ...state,
        deleteAccountData: {
          isLoading: false,
          error: action.payload,
        },
      };
    case UPDATE_ACCOUNT_LOADING:
      return {
        ...state,
        updateAccountData: {
          isLoading: true,
          error: false,
        },
      };
    case UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        updateAccountData: {
          isLoading: false,
          data: action.payload,
        },
      };
    case UPDATE_ACCOUNT_FAIL:
      return {
        ...state,
        updateAccountData: {
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
        deleteAccountData: {
          error: false,
          data: false,
        },
        updateAccountData: {
          error: false,
          data: false,
        },
      };
    default:
      return state;
  }
}