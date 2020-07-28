import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FrontPage from './pages/frontPage/FrontPageMain';
import LoginMain from './pages/loginPage/LoginMain';
import ProfileSettingsMain from './pages/profileSettingsPage/ProfileSettingsMain';
import LobbyMain from './pages/lobbyPage/LobbyMain';
import DashboardMain from './pages/dashboardPage/DashboardMain';
import SignUpMain from './pages/signUpPage/SignUpMain';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/dashboard' component={DashboardMain} />
          <Route exact path='/login' component={LoginMain} />
          <Route exact path='/signup' component={SignUpMain} />
          <Route exact path='/lobby' component={LobbyMain} />
          <Route exact path='/settings' component={ProfileSettingsMain} />
          <Route exact path='' component={FrontPage} />
          <Route exact path='/' component={FrontPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
