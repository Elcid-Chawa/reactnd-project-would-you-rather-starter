import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared';
import '../App.css';
import { BrowserRouter } from 'react-router-dom'
import Login from './login';
import Menu from './menu';
import Home from './home';
import { Switch, Route, withRouter } from 'react-router';
import Newquestion from './Newquestion';
import Leaderboard from './Leaderboard';
import QuestionsBank from './QuestionsBank';
import ProtectedRoute from './ProtectedRoute';
import PageNotFound from './PageNotFound';

class App extends Component  {

  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render (){

    const {  login } = this.props

    const isAuthenticated = login !== null ? login.isLoggedin : false

    console.log(isAuthenticated)

    return (
      <BrowserRouter>
        <Fragment>
          <div className="App">
            { !isAuthenticated ?  <Login /> 
              : <div>
                <Menu />
                <Switch>
                  <ProtectedRoute exact path='/' component={Home} isAuthenticated={isAuthenticated} />
                  <Route path='/login' component={withRouter(Login)} />
                  <ProtectedRoute path="/new-question" component={Newquestion} isAuthenticated={isAuthenticated} />
                  <ProtectedRoute path="/leaderboard" component={Leaderboard} isAuthenticated={isAuthenticated} />
                  <ProtectedRoute path="/questions/:id" component={ QuestionsBank } isAuthenticated={isAuthenticated} />
                  <ProtectedRoute path="/answer/:id" component={QuestionsBank} isAuthenticated={isAuthenticated} />
                  <Route component={PageNotFound} />
                </Switch>
                </div>
            }
                   
          
            
        </div>
      </Fragment>
      </BrowserRouter>  
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
