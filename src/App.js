import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FrontPage from './pages/frontPage/FrontPageMain';
import ProfileSettingsMain from './pages/profileSettingsPage/ProfileSettingsMain';
import LobbyMain from './pages/lobbyPage/LobbyMain';
import DashboardMain from './pages/dashboardPage/DashboardMain';
import SignUpMain from './pages/signUpPage/SignUpMain';
import SignInMain from './pages/signInPage/SignInMain';
import Arena from './pages/arenaPage/ArenaMain';
import OutroMain from './pages/outroPage/OutroMain';
import Testing from './pages/testPage/TestPage';

function App() {
  return (
    <Router>
      <div data-testid='App' className='App'>
        <Switch>
          <Route
            data-testid='route-sorry'
            exact
            path='/sorry'
            component={OutroMain}
          />
          <Route
            data-testid='route-dashboard'
            exact
            path='/dashboard'
            component={DashboardMain}
          />
          <Route
            data-testid='route-signin'
            exact
            path='/signin'
            component={SignInMain}
          />
          <Route
            data-testid='route-signup'
            exact
            path='/signup'
            component={SignUpMain}
          />
          <Route
            data-testid='route-arena'
            exact
            path='/arena'
            component={Arena}
          />
          <Route
            data-testid='route-lobby'
            exact
            path='/lobby'
            component={LobbyMain}
          />
          <Route data-testid='test' exact path='/test' component={Testing} />
          <Route
            data-testid='route-settings'
            exact
            path='/settings'
            component={ProfileSettingsMain}
          />
          <Route data-testid='route-none' exact path='' component={FrontPage} />
          <Route
            data-testid='route-home'
            exact
            path='/'
            component={FrontPage}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
