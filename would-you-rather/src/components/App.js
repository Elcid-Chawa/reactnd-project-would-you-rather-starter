import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared';
import logo from '../logo.svg';
import '../App.css';
import Login from './login';
import Menu from './menu';
import Home from './home';
import { Switch, Route, Redirect } from 'react-router';
import Newquestion from './Newquestion';
import Leaderboard from './Leaderboard';
import QuestionsBank from './QuestionsBank';
import Answered from './answered';
import { Link } from 'react-router-dom';

class App extends Component  {

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }


  render (){

    const {  users, login, authedUser } = this.props

    return (
        <Fragment>
          <div className="App">
            { login !== null ?  login.isLoggedin &&  <Menu />
              : <div></div>
            }
                   
          
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/login' component={Login} />
              <Route path="/new-question" component={Newquestion} />
              <Route path="/leaderboard" exact component={Leaderboard} />
              <Route path="/questions:qid" exact render={ (props) => <QuestionsBank {...props} /> } />
              
              <Route exact path="/answer:qid" component={Answered} />
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
