import React, { Component } from 'react';

export class Search extends Component {
    state = {
        text: ''
    };
    onChange = e => {
        // target.name points to the value on the input tag name (text)
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    onSubmit = e => {
        e.preventDefault();
    };
    render() {
        return (
            <div>
                <form className='form' onSubmit={this.onSubmit}>
                    <input
                        type='text'
                        name='text'
                        placeholder='Search Users'
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                    <input type='submit' value='Search' className='btn btn-dark btn-block' />
                </form>
            </div>
        );
    }
}

export default Search;
