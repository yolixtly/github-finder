import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/githubState';
import AlertState from './context/alert/alertState';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar title="Github Finder" icon='fab fa-github' />
            <div className="container ">
              <Alert />
              <Switch>
                <Route
                  exact path="/"
                  render={props => (
                    <Fragment>
                      <Search />
                      <Users />
                    </Fragment>
                  )}>
                </Route>
                <Route
                  exact path="/about"
                  component={About} />
                <Route
                  exact path="/user/:login"
                  render={props => (
                    <User {...props} />
                  )} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
}

export default App;
