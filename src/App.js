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
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Settings from './pages/settings';
import Dashboard from './pages/dashboard';
import Room from './pages/room';
import Veto from './pages/veto';
import Arena from './pages/arena';
import Scoreboard from './pages/scoreboard';
import isAuthenticated from './utils/isAuthenticated';
import './App.scss';
import PreCheck from './components/preCheck/PreCheck';

const componentRegistry = {
  Dashboard: Dashboard,
  Login: Login,
  SignUp: SignUp,
  Arena: Arena,
  Scoreboard: Scoreboard,
  Room: Room,
  Veto: Veto,
  Settings: Settings,
  Home: Home,
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

  if (route.component === 'Dashboard' || route.component === 'Settings') {
    const Component = componentRegistry[route.component];
    return (
      <PreCheck route={route}>
        <Component />
      </PreCheck>
    );
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
