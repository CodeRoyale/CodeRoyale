import { ROOM_LOADING, ROOM_SUCCESS, ROOM_FAIL } from '../actions/types';
const initialState = {
  type: '',
  loading: false,
  data: null,
  error: null,
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROOM_LOADING:
      return {
        ...state,
        type: '',
        loading: true,
      };
    case ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
        type: action.action,
      };
    case ROOM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        type: '',
      };
    default:
      return state;
  }
};
export default roomReducer;
