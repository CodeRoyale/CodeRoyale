import {
  VETO_START_ADMIN,
  VETO_START_SERVER,
  VETO_STOP_SERVER,
  VETO_QUESTIONS_LOADING,
  VETO_QUESTIONS_SUCCESS,
  VETO_QUESTIONS_FAIL,
} from '../actions/types';

const initialState = {
  vetoRequested: false,
  vetoStarted: false,
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
    case VETO_STOP_SERVER:
      return {
        ...state,
        vetoStarted: false,
        resultQuestionsIDs: action.payload,
      };
    default:
      return state;
  }
};

export default vetoReducer;
