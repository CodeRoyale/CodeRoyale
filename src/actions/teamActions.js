import { TEAM_LOADING, TEAM_SUCCESS, TEAM_FAIL } from './types';

export const teamRequest = () => {
  return {
    type: TEAM_LOADING,
  };
};
export const teamSuccess = (data, action) => {
  return {
    type: TEAM_SUCCESS,
    payload: data,
    action,
  };
};

export const teamFailure = (error) => {
  return {
    type: TEAM_FAIL,
    payload: error,
  };
};
