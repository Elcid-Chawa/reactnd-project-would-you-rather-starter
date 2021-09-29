import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link, Route, Redirect } from 'react-router-dom'
import { setAuthedUser } from "../actions/authUser";
import Home from "./home";

class Login extends Component {

    state = {
        authedUser: undefined,
        isLoggedIn: false,
    }

    handleSelect = (e) => {
        
        console.log(e.target.value)
        this.setState(() => ({
            authedUser: e.target.value,
        }))
    }

    handleLogin = (e) => {
        e.preventDefault();
        console.log(this.state.authedUser);
        this.props.dispatch(setAuthedUser(this.state.authedUser));
        this.setState(() => ({
            isLoggedIn: true
        }));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        <Redirect to='/home' />;
    }

    render(){
        const { authedUser, isLoggedIn } = this.state;

        return (
            <div>
                <div className="login-box">
                    <form  onSubmit={this.handleLogin}>
                        <label>Login</label>
                        <select defaultValue={authedUser} onChange={this.handleSelect}>
                            <option value="" >Select user...</option>
                            {this.props.userIDs.map((id) => (
                                <option key={id} value={id}>{id}</option>
                            ))}
                        </select>
                        <button type='submit' onClick={this.handleSubmit}>Login</button>
                    </form>
                </div>
                { isLoggedIn && <Route path='/' render={()  => (<Home authedUser={authedUser} />)} />}
            </div>
            
        );
    }
    
}

function mapStateToProps({users, questions, authedUser}){
    return {
        userIDs: Object.keys(users),
        questions,
        authedUser
    }
}

export default connect(mapStateToProps)(Login);