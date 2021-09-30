import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared';
import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import Menu from './components/menu';
import Home from './components/home';
import { Switch, Route, Redirect } from 'react-router';
import Newquestion from './components/Newquestion';
import Leaderboard from './components/Leaderboard';
import Question from './components/questions';
import Answered from './components/answered';
import authedUser from './reducers/authUser';
import { Link } from 'react-router-dom';

class App extends Component  {

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  handelClick = (e) => {
    e.preventDefault();
    const button = document.getElementById("testbutton");
    button.style.display = "none";
  }


  render (){

    const {  users, login, authedUser } = this.props
    console.log(users)
    return (
        <Fragment>
          <div className="App">
          {login.isLoggedin &&  <Menu />}         
          
            <Switch>
              <Route path='/home' exact component={Home} />
              <Route path='/login' component={Login} />
              <Route path="/new-question" component={Newquestion} />
              <Route path="/leaderboard" component={Leaderboard} />
              <Route path="/questions:id" component={Question} />
              
              <Route exact path="/answer:id" component={Answered} />
            </Switch>
        </div>
      </Fragment>
        
    );
  }
    
    
}

function mapStateToProps ({ users, questions, login, authedUser }) {

  return {
    users,
    questions,
    login,
    authedUser
    
  }
}

export default connect(mapStateToProps)(App);
