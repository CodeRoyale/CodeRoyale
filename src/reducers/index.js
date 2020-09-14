import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signUpReducer from './signUpReducer';
import socketReducer from './socketReducer';
import roomReducer from './roomReducer';
import teamReducer from './teamReducer';
import chatReducer from './chatReducer';
import vetoReducer from './vetoReducer';
import arenaReducer from './arenaReducer';
import codeSubmitReducer from './codeSubmitReducer';

export default combineReducers({
  loginData: loginReducer,
  signUpData: signUpReducer,
  socketData: socketReducer,
  roomData: roomReducer,
  teamData: teamReducer,
  vetoData: vetoReducer,
  chatData: chatReducer,
  arenaData: arenaReducer,
  codeSubmitData: codeSubmitReducer,
});
