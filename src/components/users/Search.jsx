import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';
const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const { searchUsers, users, clearUsers } = githubContext;
    const { showAlert } = alertContext;

    const [text, setText] = useState('');

    const onChange = e => {
        // target.name points to the value on the input tag name (text)
        setText(e.target.value);
    };

    const onSubmit = e => {
        e.preventDefault();
        if (!text) {
            showAlert('Please enter something', 'light');
            return;
        }
        searchUsers(text);
        setText('');
    };
    return (
        <div>
            <form className='form' onSubmit={onSubmit}>
                <input type='text' name='text' placeholder='Search Users' value={text} onChange={onChange} />
                <input type='submit' value='Search' className='btn btn-dark btn-block' />
            </form>
            {users.length > 0 && (
                <button className='btn btn-light btn-block' onClick={clearUsers}>
                    Clear
                </button>
            )}
        </div>
    );
};

export default Search;
