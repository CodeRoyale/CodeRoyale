import {
  ARENA_QUESTIONS_LOADING,
  ARENA_QUESTIONS_SUCCESS,
  ARENA_QUESTIONS_FAIL,
  ARENA_COMPETITION_STOPPED,
  ARENA_ROOM_CODE_SUBMIT_STATUS,
  ARENA_COMPETITION_STARTED,
  ARENA_CODE_SUBMIT_LOADING,
  ARENA_CODE_SUBMIT_SUCCESS,
  ARENA_CODE_SUBMIT_FAIL,
  ARENA_DATA_RESET,
} from '../actions/types';

const intialState = {
  isLoading: false,
  competitionStopped: false,
  codeSubmission: {
    isLoading: false,
    error: false,
  },
};

const arenaReducer = (state = intialState, action) => {
  switch (action.type) {
    case ARENA_COMPETITION_STARTED:
      return {
        ...state,
        scoreboard: action.payload.returnObj.scoreboard,
      };
    case ARENA_QUESTIONS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ARENA_QUESTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        questions: action.payload,
      };
    case ARENA_QUESTIONS_FAIL:
      return {
        ...state,
        isLoading: false,
        questions: action.payload,
      };
    case ARENA_CODE_SUBMIT_LOADING:
      return {
        ...state,
        codeSubmission: {
          ...state.codeSubmission,
          isLoading: true,
        },
      };
    case ARENA_CODE_SUBMIT_FAIL:
      return {
        ...state,
        codeSubmission: {
          ...state.codeSubmission,
          isLoading: false,
          error: action.payload,
        },
      };
    case ARENA_CODE_SUBMIT_SUCCESS:
      return {
        ...state,
        codeSubmission: {
          ...state.codeSubmission,
          isLoading: false,
          data: action.payload,
        },
        scoreboard: {
          ...state.scoreboard,
          [action.payload.team_name]: [
            ...state.scoreboard[action.payload.team_name],
            action.payload.problemCode,
          ],
        },
      };
    case ARENA_ROOM_CODE_SUBMIT_STATUS:
      return {
        ...state,
        codeSubmission: {
          ...state.codeSubmission,
          data: action.payload,
        },
        scoreboard: {
          ...state.scoreboard,
          [action.payload.team_name]: [
            ...state.scoreboard[action.payload.team_name],
            action.payload.problemCode,
          ],
        },
      };
    case ARENA_COMPETITION_STOPPED:
      return {
        ...state,
        competitionStopped: true,
        scoreboardData: action.payload,
      };
    case ARENA_DATA_RESET:
      return {
        ...state,
        codeSubmission: {
          error: false,
          data: false,
        },
      };
    default:
      return state;
  }
};

export default arenaReducer;
