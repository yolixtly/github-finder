import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import axios from 'axios';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { About } from './components/pages/About';
class App extends React.Component {
  state = {
    users: [],
    loading: false,
    alert: null
  }

  searchUsers = async text => {
    this.setState({
      loading: true
    });

    let url = `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    await axios.get(url).then(res => {

      setTimeout(() => {
        this.setState({
          loading: false,
          users: res.data.items
        });
      }, 500);

    });
  }

  clearUsers = () => {
    this.setState({
      users: [],
      loading: false
    });
  }
  setAlert = (msg, type) => {
    this.setState({
      alert: {
        msg,
        type
      }
    });

    setTimeout(() => {
      this.setState({
        alert: null
      });
    }, 5000);
  }
  render() {
    const { users, loading, alert } = this.state;
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
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert} />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}>
              </Route>
              <Route
                exact path="/about"
                component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
