import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
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
import PreCheck from './components/preCheck';
import './App.css';

// Initializing react-query client
const queryClient = new QueryClient();

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

  const { title, needsAuth, component, path } = route;

  // Setting titles for all pages
  document.title = title || 'CodeRoyale';

  if (needsAuth && !isAuthenticated()) {
    history.push('/login');
  }

  // If user is logged in then redirect to dashboard if home/login/signup is visited
  if (component === 'Home' && isAuthenticated()) {
    history.push('/dashboard');
  } else if (component === 'Login' && isAuthenticated()) {
    history.push('/dashboard');
  } else if (component === 'SignUp' && isAuthenticated()) {
    history.push('/dashboard');
  }

  const Component = componentRegistry[component];

  // If its Login, signup or home page then no need of preCheck
  if (component === 'Home' || component === 'Login' || component === 'SignUp') {
    return (
      <Route exact path={path}>
        {component === 'Login' || component === 'SignUp' ? (
          <QueryClientProvider client={queryClient}>
            <Component />
          </QueryClientProvider>
        ) : (
          <Component />
        )}
      </Route>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PreCheck route={route} componentName={component}>
        <Component />
      </PreCheck>
    </QueryClientProvider>
  );
};

const App = () => (
  <div data-testid='App' className='App'>
    <Router>
      <Switch>
        {routes.map((route) => (
          <RenderRoute
            key={uuidv4()}
            path={route.path}
            component={route.component}
            title={route.title}
            needsAuth={route.needsAuth}
          />
        ))}
      </Switch>
    </Router>
  </div>
);

export default App;
