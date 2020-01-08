import React from 'react';
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

  async componentDidMount() {
    // HTTP Requests Go Here when we do not have Redux
    this.setState({
      loading: true
    });

    await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`).then(res => {
      this.setState({
        loading: false,
        users: res.data
      });
    });
  }
  render() {
    return (
      <div className="App">
        <Navbar title="Github Finder" icon='fab fa-github' />
        <div className="container ">
          <Search />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
