import React, { Component } from 'react'

export class UserItem extends Component {
    constructor() {
        super();
        this.state = {
            id: 'id',
            login: "mojombo",
            avatar_url: "https://picsum.photos/id/237/200/300",
            html_url: "https://picsum.photos/id/237/200/300"
        }
    }
    render() {
        const {
            login,
            avatar_url,
            html_url
        } = this.props.user;

        return (
            <div className="card text-center">
                <img src={avatar_url}
                    className="round-img"
                    style={{ width: "60px" }}
                    alt="" />
                <h3>{login}</h3>
                <div>
                    <a href={html_url}
                        className="btn btn-dark btn-sm my-1">
                        more
                        </a>
                </div>
            </div>
        )
    }
}

export default UserItem
