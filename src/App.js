import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import routes from './routes';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';
import Settings from './pages/settings/Settings';
import Dashboard from './pages/dashboard/Dashboard';
import Room from './pages/room/Room';
import Veto from './pages/veto/Veto';
import ArenaMain from './pages/arenaPage/ArenaMain';
import Scoreboard from './pages/scoreboard/Scoreboard';
import TestPage from './pages/testPage/TestPage';
import isAuthenticated from './utils/isAuthenticated';
import './App.css';

const componentRegistry = {
  Dashboard: Dashboard,
  Login: Login,
  SignUp: SignUp,
  ArenaMain: ArenaMain,
  Scoreboard: Scoreboard,
  Room: Room,
  Veto: Veto,
  Settings: Settings,
  Home: Home,
  TestPage: TestPage,
};

const RenderRoute = (route) => {
  const history = useHistory();

  // Setting titles for all pages
  document.title = route.title || 'CodeRoyale';

  if (route.needsAuth && !isAuthenticated()) {
    history.push('/login');
  }

  // If user is logged in then redirect to dashboard if home/login/signup is visited
  if (route.component === 'Home' && isAuthenticated()) {
    history.push('/dashboard');
  } else if (route.component === 'Login' && isAuthenticated()) {
    history.push('/dashboard');
  } else if (route.component === 'SignUp' && isAuthenticated()) {
    history.push('/dashboard');
  }

  return (
    <Route
      exact
      path={route.path}
      component={componentRegistry[route.component]}
    />
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <div data-testid='App' className='App'>
        <Router>
          <Switch>
            {routes.map((route, index) => (
              <RenderRoute {...route} key={index} />
            ))}
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
