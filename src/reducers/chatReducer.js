import {
  CHANGED_CHAT_TYPE,
  CHAT_EVERYONE_SUCCESS,
  CHAT_TEAM_SUCCESS,
  CHAT_FAIL,
} from '../actions/types';

const initialState = {
  chatType: 'everyone',
  everyoneMsgList: [],
  teamMsgList: [],
  error: '', //id,msg,col,source
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGED_CHAT_TYPE:
      return {
        ...state,
        chatType: action.payload,
      };
    case CHAT_EVERYONE_SUCCESS:
      return {
        ...state,
        everyoneMsgList: state.everyoneMsgList.concat(action.payload),
      };
    case CHAT_TEAM_SUCCESS:
      return {
        ...state,
        teamMsgList: state.teamMsgList.concat(action.payload),
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
