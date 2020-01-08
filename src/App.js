import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import axios from 'axios';
class App extends React.Component {
  state = {
    users: [],
    loading: false
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired
  }
  searchUsers = async text => {
    this.setState({
      loading: true
    });

    let url = `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    await axios.get(url).then(res => {
      this.setState({
        loading: false,
        users: res.data.items
      });
    });
  }
  render() {
    return (
      <div className="App">
        <Navbar title="Github Finder" icon='fab fa-github' />
        <div className="container ">
          <Search searchUsers={this.searchUsers} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
