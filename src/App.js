import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Lobby from './components/lobby/Lobby';
import FrontPage from './components/front-page/FrontPage';

function App() {
  return (
    // I think this route should be modified...
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
