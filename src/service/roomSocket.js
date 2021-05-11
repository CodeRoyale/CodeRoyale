/* eslint-disable consistent-return */
import { ERROR_MSG } from '../utils/constants';

export const createRoom = (
  socket,
  {
    maxTeams,
    maxPerTeam,
    maxPerRoom,
    timeLimit,
    privateRoom,
    maxQuestions,
    maxVetoVotes,
    maxVetoQuestions,
  },
  cb
) => {
  if (!socket) return false;

  socket.emit(
    'CREATE_ROOM',
    {
      max_teams: maxTeams,
      max_perTeam: maxPerTeam,
      max_perRoom: maxPerRoom,
      timeLimit,
      privateRoom,
      max_questions: maxQuestions,
      max_vote: maxVetoVotes,
      veto_quesCount: maxVetoQuestions,
    },
    (data) => {
      if (data) {
        if (data !== ERROR_MSG) {
          // Create room success
          return cb(null, data);
        }
        // Create room fail
        return cb(data, null);
      }
      // Server didnt send back data
      return cb('No response from server', null);
    }
  );
};

export const joinRoom = (socket, { roomId }, cb) => {
  if (!socket) return false;

  socket.emit('JOIN_ROOM', { room_id: roomId }, (data) => {
    if (data) {
      if (data !== ERROR_MSG) {
        // Join room success
        return cb(null, data);
      }
      // Join room fail
      return cb(data, null);
    }
    // Server didnt send back data
    return cb('No response from server', null);
  });
};

export const closeRoom = (socket, cb) => {
  if (!socket) return false;

  socket.emit('CLOSE_ROOM', {}, (data) => {
    if (data) {
      if (data !== ERROR_MSG) {
        // Close room success
        return cb(null, data);
      }
      // Close room fail
      return cb(data, null);
    }
    // Server didnt send back data
    return cb('No response from server', null);
  });
};

export const getRoom = (socket, { roomId }, cb) => {
  if (!socket) return false;

  socket.emit('GET_ROOM', { room_id: roomId }, (data) => {
    if (data) {
      if (data !== ERROR_MSG) {
        // Get room success
        return cb(null, data);
      }
      // Get room fail
      return cb(data, null);
    }
    return cb('No response from server', null);
  });
};

export const roomClosed = (socket, cb) => {
  if (!socket) return false;

  socket.off('ROOM_CLOSED').on('ROOM_CLOSED', (data) => {
    if (data && data.data.dataToEmit === 'Room Closed') {
      return cb(null, data);
    }
  });
};

export const roomUpdated = (socket, cb) => {
  if (!socket) return false;

  socket.on('ROOM_UPDATED', (data) => {
    if (data && data.type !== undefined) {
      return cb(null, data);
    }
  });
};
