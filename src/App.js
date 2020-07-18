import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Lobby from './components/lobby/Lobby';
import FrontPage from './components/frontPage/FrontPage';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/lobby' component={Lobby} />
          <Route exact path='' component={FrontPage} />
          <Route exact path='/' component={FrontPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
