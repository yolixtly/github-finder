import React, { Component } from 'react';
import UserItem from './UserItem';

export class Users extends Component {
    state = {
        users: [
            {
                id: 'id1',
                login: 'mojombo1',
                avatar_url: 'https://picsum.photos/id/237/200/300',
                html_url: 'https://picsum.photos/id/237/200/300'
            },
            {
                id: 'id2',
                login: 'mojombo2',
                avatar_url: 'https://picsum.photos/id/237/200/300',
                html_url: 'https://picsum.photos/id/237/200/300'
            },
            {
                id: 'id3',
                login: 'mojombo3',
                avatar_url: 'https://picsum.photos/id/237/200/300',
                html_url: 'https://picsum.photos/id/237/200/300'
            }
        ]
    };
    render() {
        return (
            <div style={userStyle}>
                {this.state.users.map(user => {
                    return <UserItem key={user.id} user={user} />;
                })}
            </div>
        );
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
};

export default Users;
