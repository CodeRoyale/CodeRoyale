import {
  VETO_START_ADMIN,
  VETO_GET_ALL_USERS,
  VETO_START_SERVER,
  VETO_STOP_SERVER,
  VETO_USER_VOTED,
  VETO_QUESTIONS_LOADING,
  VETO_QUESTIONS_SUCCESS,
  VETO_QUESTIONS_FAIL,
  VETO_FAIL,
  VETO_ADD_VOTE_QUESTION,
  VETO_REMOVE_VOTE_QUESTION,
  VETO_USER_VOTED_STATUS,
  ACTION_RESET,
} from '../actions/types';

const initialState = {
  quesApiLoading: false,
  vetoRequested: false,
  vetoStarted: false,
  vetoVotedQuestions: [],
  vetoCompletedUsers: [],
  userVoted: false,
  error: false,
};

const vetoReducer = (state = initialState, action) => {
  // Remove the question from array based on qid
  const handleRemoveVoteQuestion = (questionID) => {
    let newVetoVotedQuestions = state.vetoVotedQuestions;
    const index = newVetoVotedQuestions.indexOf(questionID);
    if (index > -1 && index === 0) {
      return [];
    } else {
      delete newVetoVotedQuestions[index];
      return newVetoVotedQuestions;
    }
  };

  switch (action.type) {
    case VETO_START_ADMIN:
      return {
        ...state,
        vetoRequested: true,
      };
    case VETO_GET_ALL_USERS:
      return {
        ...state,
        vetoUsers: action.payload,
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
    case VETO_ADD_VOTE_QUESTION:
      return {
        ...state,
        vetoVotedQuestions: state.vetoVotedQuestions.concat(action.payload),
      };
    case VETO_REMOVE_VOTE_QUESTION:
      return {
        ...state,
        vetoVotedQuestions: handleRemoveVoteQuestion(action.payload),
      };
    case VETO_USER_VOTED_STATUS:
      return {
        ...state,
        vetoCompletedUsers: state.vetoCompletedUsers.concat(
          action.payload.userName
        ),
      };
    case VETO_FAIL:
      return {
        ...state,
        vetoRequested: false,
        vetoStarted: false,
        userVoted: false,
        error: action.payload,
      };
    case ACTION_RESET:
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
};

export default vetoReducer;
