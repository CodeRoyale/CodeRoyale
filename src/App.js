import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Lobby from './components/lobby/Lobby';
import FrontPage from './pages/frontPage/FrontPageMain';
import LoginMain from './pages/loginPage/LoginMain';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/login' component={LoginMain} />
          <Route exact path='/lobby' component={Lobby} />
          <Route exact path='' component={FrontPage} />
          <Route exact path='/' component={FrontPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
