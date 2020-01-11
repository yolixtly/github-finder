import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ showAlert, searchUsers, showClear, clearUsers }) => {
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
            {showClear && (
                <button className='btn btn-light btn-block' onClick={clearUsers}>
                    Clear
                </button>
            )}
        </div>
    );
};

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    showAlert: PropTypes.func.isRequired
};

export default Search;
