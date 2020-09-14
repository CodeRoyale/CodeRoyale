import {
  CODE_SUBMIT_LOADING,
  CODE_SUBMIT_SUCCESS,
  CODE_SUBMIT_FAIL,
  ACTION_RESET,
} from '../actions/types';

const initialState = {
  loading: false,
  data: null,
  error: null,
  type: '',
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case CODE_SUBMIT_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        type: '',
      };
    case CODE_SUBMIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        type: action.action,
      };
    case CODE_SUBMIT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        type: '',
      };
    case ACTION_RESET:
      return {
        ...state,
        error: null,
        type: '',
      };
    default:
      return state;
  }
};
export default roomReducer;
