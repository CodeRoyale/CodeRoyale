import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import FrontPage from './components/frontPage/FrontPage';
import DashboardMain from './pages/dashboardPage/DashboardMain';
import LobbyMain from './pages/lobbyPage/LobbyMain';
// import Lobby from './components/lobby/Lobby';
import FrontPage from './pages/frontPage/FrontPageMain';
import LoginMain from './pages/loginPage/LoginMain';
import ProfileSettingsMain from './pages/profileSettingsPage/ProfileSettingsMain';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/dashboard' component={DashboardMain} />
          <Route exact path='/login' component={LoginMain} />
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
