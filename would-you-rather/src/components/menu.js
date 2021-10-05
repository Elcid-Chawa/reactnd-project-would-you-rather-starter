import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { unsetAuthedUser } from '../actions/authUser';
import { handleLogout } from '../actions/login';

class Menu extends Component {


    handleClick = (e) => {
        e.preventDefault();

        this.props.dispatch(unsetAuthedUser(this.props.authedUser));
        this.props.dispatch(handleLogout(this.props.authedUser));

    }

    render(){
        const {user, authedUser} = this.props;
        const avatarURL = user !== undefined ? user.avatarURL : ''

        return (
            <div className="App">

            
                <div className="nav" align="center">
                    <ul>
                        { authedUser !== ( null || undefined) && <li><span><img src={avatarURL} alt={authedUser} width="50" height="50"  /></span></li>}
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/new-question">Questions</NavLink></li>
                        <li><NavLink to="/leaderboard"> Leaderboard</NavLink></li>
                        { authedUser === ( null || undefined) && <li><span><img src={avatarURL} alt={authedUser} width="50" height="50"  /></span> Login</li>}
                        { authedUser !== ( null || undefined) && <li onClick={this.handleClick}><NavLink to='/login' > Logout</NavLink></li>}
                    </ul>
                </div>
            </div>
    );
    }
}

function mapStateToProps({authedUser, users, login}) {

    const user = users[authedUser]

    return {
        authedUser,
        user: user,
        login,

    }
    
}

export default connect(mapStateToProps)(Menu);