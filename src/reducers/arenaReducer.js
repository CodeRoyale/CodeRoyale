import {
  ARENA_QUESTIONS_LOADING,
  ARENA_QUESTIONS_SUCCESS,
  ARENA_QUESTIONS_FAIL,
  ARENA_COMPETITION_STOPPED,
} from '../actions/types';

const intialState = {
  isLoading: false,
  competitionStopped: false,
};

const arenaReducer = (state = intialState, action) => {
  switch (action.type) {
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
    case ARENA_COMPETITION_STOPPED:
      return {
        ...state,
        competitionStopped: true,
        scoreboardData: action.payload,
      };
    default:
      return state;
  }
};

export default arenaReducer;
