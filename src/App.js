import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Lobby from './components/lobby/Lobby';
import FrontPage from './components/frontPage/FrontPage';
import ProfileSettingsMain from './pages/profileSettingsPage/ProfileSettingsMain';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/lobby' component={Lobby} />
          <Route exact path='/settings' component={ProfileSettingsMain} />
          <Route exact path='' component={FrontPage} />
          <Route exact path='/' component={FrontPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
