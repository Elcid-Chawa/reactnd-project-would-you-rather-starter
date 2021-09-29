import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared';
import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import Menu from './components/menu';
import Home from './components/home';
import { Switch, Route } from 'react-router';
import Newquestion from './components/Newquestion';
import Leaderboard from './components/Leaderboard';
import Question from './components/questions';
import Answered from './components/answered';

class App extends Component  {

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }


  render (){

    return (
        <div className="App">
          
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/new-question" component={Newquestion} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route exact path="/questions:id" component={Question} />
          <Route exact path='/' component={Home} />
          <Route path="/answer:id" component={Answered} />
        </Switch>
      </div>
    );
  }
    
    
}

function mapStateToProps ({ users, questions }) {
  return {
    users,
    questions,
  }
}

export default connect(mapStateToProps)(App);
