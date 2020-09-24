import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import routes from './routes';
import 'rsuite/lib/styles/index.less';
import './App.css';

const App = () => {
  console.log(routes);
  return (
    <Provider store={store}>
      <Router>
        <div data-testid='App' className='App'>
          <Switch>
            {routes.map((index, route) => (
              <Route
                exact
                key={index}
                path={route.path}
                render={(props) => <route.component {...props} />}
              />
            ))}
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
