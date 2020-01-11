import React, { Fragment, useState } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import axios from 'axios';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';
import User from './components/users/User';
const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const searchUsers = async text => {
    setLoading(true);

    let url = 'https://api.github.com/search/users?' +
      `q=${text}&` +
      `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&` +
      `client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    await axios.get(url).then(res => {
      setLoading(false);
      setUsers(res.data.items);
    });
  }
  const getUser = async (username) => {
    setLoading(true);

    let url = `https://api.github.com/users/${username}?` +
      `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&` +
      `client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    await axios.get(url).then(res => {
      setLoading(false);
      setUser(res.data);
    });
  }
  const getUserRepos = async (username) => {
    setLoading(true);

    let url = `https://api.github.com/users/${username}/repos?` +
      `per_page=5&sort=created:asc&` +
      `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&` +
      `client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    await axios.get(url).then(res => {
      setLoading(false);
      setRepos(res.data);
    });
  }
  const clearUsers = () => {
    setLoading(false);
    setUsers([]);
  }
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
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    showAlert={showAlert} />
                  <Users loading={loading} users={users} />
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
                  getUser={getUser}
                  user={user}
                  getUserRepos={getUserRepos}
                  repos={repos}
                  loading={loading} />
              )} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
