import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/types';

const initialState = {
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isLoggedIn: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
