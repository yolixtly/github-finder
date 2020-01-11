import React, { Fragment, useState } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/githubState';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({
      msg,
      type
    });

    setTimeout(() => {
      this.setAlert(null);
    }, 5000);
  }
  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title="Github Finder" icon='fab fa-github' />
          <div className="container ">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact path="/"
                render={props => (
                  <Fragment>
                    <Search
                      showAlert={showAlert} />
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
                  <User {...props}
                    loading={loading} />
                )} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
}

export default App;
