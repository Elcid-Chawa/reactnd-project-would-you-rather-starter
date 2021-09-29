import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';

class Menu extends Component {
    render(){
        const {user, authedUser} = this.props;
        const avatarURL = user.avatarURL
        return (
        <div className="nav">
            <ul>
                { authedUser !== null && <li><span><img src={avatarURL} alt={authedUser} width="50" height="50"  /></span></li>}
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/new-question">Questions</NavLink></li>
                <li><NavLink to="/leaderboard"> Leaderboard</NavLink></li>
                { authedUser === null && <li><span><img src={avatarURL} alt={authedUser} width="50" height="50"  /></span> Login</li>}
                { authedUser !== null && <li><NavLink to='/login'> Logout</NavLink></li>}
            </ul>
        </div>
    );
    }
}

function mapStateToProps({authedUser, users}) {

    const user = users[authedUser]

    return {
        authedUser,
        user: user,

    }
    
}

export default connect(mapStateToProps)(Menu);