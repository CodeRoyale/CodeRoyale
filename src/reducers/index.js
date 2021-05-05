import { combineReducers } from 'redux';
import socketReducer from './socketReducer';
import roomReducer from './roomReducer';
import teamReducer from './teamReducer';
import chatReducer from './chatReducer';
import vetoReducer from './vetoReducer';
import arenaReducer from './arenaReducer';

export default combineReducers({
  socketData: socketReducer,
  roomData: roomReducer,
  teamData: teamReducer,
  vetoData: vetoReducer,
  chatData: chatReducer,
  arenaData: arenaReducer,
});
