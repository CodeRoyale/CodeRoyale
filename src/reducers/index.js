import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signUpReducer from './signUpReducer';
import socketReducer from './socketReducer';

export default combineReducers({
  loginData: loginReducer,
  signUpData: signUpReducer,
  socketData: socketReducer,
});
