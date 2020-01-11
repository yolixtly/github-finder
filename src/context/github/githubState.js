import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_REPOS,
    GET_USER
} from '../types';
// Has the initial State and Actions

const GithubState = props => {
    // Global State for any Github related data
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search Users
    const searchUsers = async text => {
        setLoading();

        let url = 'https://api.github.com/search/users?' +
            `q=${text}&` +
            `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&` +
            `client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

        await axios.get(url).then(res => {
            dispatch({
                type: SEARCH_USERS,
                payload: res.data.items
            });
        });
    }

    // Get User
    const getUser = async (username) => {
        setLoading(true);

        let url = `https://api.github.com/users/${username}?` +
            `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&` +
            `client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

        await axios.get(url).then(res => {
            dispatch({
                type: GET_USER,
                payload: res.data
            });
        });
    }

    // Get Repos

    // Clear Users
    const clearUsers = () => {
        dispatch({
            type: CLEAR_USERS
        });
    }

    // Set Loading
    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        });
    }
    return <GithubContext.Provider
        // any piece of state we want to make available to the application
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser
        }}
    >
        {props.children}
    </GithubContext.Provider>
};

export default GithubState;

