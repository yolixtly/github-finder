import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = ({ showAlert }) => {
    const githubContext = useContext(GithubContext);

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
        githubContext.searchUsers(text);
        setText('');
    };
    return (
        <div>
            <form className='form' onSubmit={onSubmit}>
                <input type='text' name='text' placeholder='Search Users' value={text} onChange={onChange} />
                <input type='submit' value='Search' className='btn btn-dark btn-block' />
            </form>
            {githubContext.users.length > 0 && (
                <button className='btn btn-light btn-block' onClick={githubContext.clearUsers}>
                    Clear
                </button>
            )}
        </div>
    );
};

Search.propTypes = {
    showAlert: PropTypes.func.isRequired
};

export default Search;
