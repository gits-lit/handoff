import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.scss';

import HomePage from './components/HomePage';
import DeployPage from './components/DeployPage';
import LandingPage from './components/LandingPage';
import ViewFilesPage from './components/ViewFilesPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/viewfiles">
            <ViewFilesPage />
          </Route>
          <Route exact path="/l">
            <DeployPage />
          </Route>
          <Route path="/app">
            <HomePage />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
