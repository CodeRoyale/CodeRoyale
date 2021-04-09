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
import DashboardMain from './pages/dashboardPage/DashboardMain';
import SettingsMain from './pages/settingsPage/SettingsMain';
import ArenaMain from './pages/arenaPage/ArenaMain';
import RoomMain from './pages/roomPage/RoomMain';
import VetoMain from './pages/vetoPage/VetoMain';
import ScoreboardMain from './pages/scoreboardPage/ScoreboardMain';
import TestPage from './pages/testPage/TestPage';
import isAuthenticated from './utils/isAuthenticated';
import 'rsuite/lib/styles/index.less';
import './App.css';

const componentRegistry = {
  DashboardMain: DashboardMain,
  Login: Login,
  SignUp: SignUp,
  ArenaMain: ArenaMain,
  ScoreboardMain: ScoreboardMain,
  RoomMain: RoomMain,
  VetoMain: VetoMain,
  SettingsMain: SettingsMain,
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
