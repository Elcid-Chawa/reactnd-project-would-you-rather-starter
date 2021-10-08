import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from "../actions/authUser";
import { handleLogin } from "../actions/login";

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
        
        this.setState(() => ({
            loggedIn: true
        }))
        this.props.dispatch(setAuthedUser(this.state.authedUser));    
    }

    

    render(){
        const { authedUser, loggedIn } = this.state;
        const { isLoggedin } = this.props;

        if(loggedIn){
            return <Redirect to='/' />
        }
        
        return (
                <div className="login-box" align="center">
                    <h3> Welcome to Would You Rather App</h3>
                    <h5>Please select a User below to Login</h5>
                    <form  onSubmit={this.handleAuth}>
                        <p><label>Login</label></p>
                        <p><select defaultValue={authedUser} onChange={this.handleSelect} required>
                            <option value="" >Select user...</option>
                            {this.props.userIDs.map((id) => (
                                <option key={id} value={id}>{id}</option>
                            ))}
                        </select></p>
                        <p><button type='submit'>Login</button></p>
                        {isLoggedin && <p>Logged IN</p>}
                    </form>
                </div>
            
        );
    }
    
}

function mapStateToProps({users, questions, authedUser, login}){

    const user = authedUser

    const isLogggedIn = (login !== null ) ? login.isLoggedin : false;
    return {
        userIDs: Object.keys(users),
        questions,
        user,
        isLogggedIn,
    }
}

export default connect(mapStateToProps)(Login);