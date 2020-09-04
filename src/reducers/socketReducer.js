import { SOCKET_LOADING, SOCKET_SUCCESS, SOCKET_FAIL } from '../actions/types';

const initialState = {
  loading: false,
  socket: null,
  error: '',
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCKET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SOCKET_SUCCESS:
      return {
        ...state,
        loading: false,
        socket: action.payload,
      };
    case SOCKET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default socketReducer;
