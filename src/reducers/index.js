import { combineReducers } from 'redux';
import socketReducer from './socketReducer';
import roomReducer from './roomReducer';
import teamReducer from './teamReducer';
import chatReducer from './chatReducer';
import vetoReducer from './vetoReducer';
import arenaReducer from './arenaReducer';
import codeSubmitReducer from './codeSubmitReducer';
import userReducer from './userReducer';

export default combineReducers({
  userData: userReducer,
  socketData: socketReducer,
  roomData: roomReducer,
  teamData: teamReducer,
  vetoData: vetoReducer,
  chatData: chatReducer,
  arenaData: arenaReducer,
  codeSubmitData: codeSubmitReducer,
});
