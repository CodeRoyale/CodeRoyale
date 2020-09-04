import { ROOM_LOADING, ROOM_SUCCESS, ROOM_FAIL } from './types';

export const roomRequest = () => {
  return {
    type: ROOM_LOADING,
  };
};
export const roomSuccess = (data, action) => {
  return {
    type: ROOM_SUCCESS,
    payload: data,
    action,
  };
};

export const roomFailure = (error) => {
  return {
    type: ROOM_FAIL,
    payload: error,
  };
};
