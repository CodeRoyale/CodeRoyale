import {
  VETO_START_ADMIN,
  VETO_START_SERVER,
  VETO_STOP_SERVER,
  VETO_USER_VOTED,
  VETO_QUESTIONS_LOADING,
  VETO_QUESTIONS_SUCCESS,
  VETO_QUESTIONS_FAIL,
  VETO_FAIL,
  ACTION_RESET,
} from '../actions/types';

const initialState = {
  quesApiLoading: false,
  vetoRequested: false,
  vetoStarted: false,
  userVoted: false,
};

const vetoReducer = (state = initialState, action) => {
  switch (action.type) {
    case VETO_START_ADMIN:
      return {
        ...state,
        vetoRequested: true,
      };
    case VETO_START_SERVER:
      return {
        ...state,
        vetoStarted: true,
        vetoQuestionIDs: action.payload,
      };
    case VETO_QUESTIONS_LOADING:
      return {
        ...state,
        quesApiLoading: true,
      };
    case VETO_QUESTIONS_SUCCESS:
      return {
        ...state,
        quesApiLoading: false,
        vetoQuestions: action.payload,
      };
    case VETO_QUESTIONS_FAIL:
      return {
        ...state,
        quesApiLoading: false,
        error: action.payload,
      };
    case VETO_USER_VOTED:
      return {
        ...state,
        userVoted: true,
      };
    case VETO_STOP_SERVER:
      return {
        ...state,
        vetoStarted: false,
        contestQuestionIDs: action.payload,
        vetoEnded: true,
      };
    case VETO_FAIL:
      return {
        ...state,
        vetoRequested: false,
        vetoStarted: false,
        userVoted: false,
        type: action.type,
        error: action.payload,
      };
    case ACTION_RESET:
      return {
        ...state,
        type: action.type,
        error: '',
      };
    default:
      return state;
  }
};

export default vetoReducer;
