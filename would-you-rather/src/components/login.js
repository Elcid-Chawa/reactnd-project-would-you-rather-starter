import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom'
import { setAuthedUser } from "../actions/authUser";
import { handleLogin } from "../actions/login";
import Home from "./home";

class Login extends Component {

    state = {
        authedUser: undefined,
        loggedIn: false
    }

    handleSelect = (e) => {
        
        this.setState(() => ({
            authedUser: e.target.value,
        }))
        
    }

    handleAuth = (e) => {
        e.preventDefault();

        this.props.dispatch(handleLogin(this.state.authedUser));
        this.props.dispatch(setAuthedUser(this.state.authedUser));

        this.setState(() => ({
            loggedIn: true
        }))
    }

    

    render(){
        const { authedUser, loggedIn } = this.state;
        const { user, isLoggedin } = this.props;

        if(loggedIn){
            return <Redirect to='/' />
        }
        
        return (
                <div className="login-box" align="center">
                    <form  onSubmit={this.handleAuth}>
                        <label>Login</label>
                        <select defaultValue={authedUser} onChange={this.handleSelect}>
                            <option value="" >Select user...</option>
                            {this.props.userIDs.map((id) => (
                                <option key={id} value={id}>{id}</option>
                            ))}
                        </select>
                        <button type='submit'>Login</button>
                        {isLoggedin && <p>Logged IN</p>}
                    </form>
                </div>
            
        );
    }
    
}

function mapStateToProps({users, questions, authedUser, login}){

    const user = authedUser

    const isLogggedIn = (login !== null )? login.isLoggedin : false;
    return {
        userIDs: Object.keys(users),
        questions,
        user,
        isLogggedIn,
    }
}

export default connect(mapStateToProps)(Login);