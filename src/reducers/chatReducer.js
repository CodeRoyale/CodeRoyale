import { CHAT_SUCCESS, CHAT_FAIL } from '../actions/types';

const initialState = {
  msgList: [],
  error: '', //id,msg,col,source
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHAT_SUCCESS:
      return {
        ...state,
        msgList: state.msgList.concat(action.payload),
      };
    case CHAT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
