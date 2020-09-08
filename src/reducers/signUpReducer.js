import { SIGNUP_LOADING, SIGNUP_SUCCESS, SIGNUP_FAIL } from '../actions/types';

const initialState = {
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    default:
      return state;
  }
}
