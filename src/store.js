import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleWare = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  process.env.REACT_APP_ENV === 'development'
    ? compose(
        applyMiddleware(...middleWare),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    : compose(applyMiddleware(...middleWare))
);

export default store;
