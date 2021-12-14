import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleInitialData } from '../actions/shared';
import '../App.css';
import { BrowserRouter, Switch, Route  } from 'react-router-dom'
import Login from './Login';
import Menu from './Menu';
import Home from './Home';
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

    return (
      <BrowserRouter>
        <Fragment>
          <div className="App">
            { !isAuthenticated ?  <Login /> 
              : <div>
                <Menu />
                <Switch>
                  <ProtectedRoute exact path='/' component={Home} isAuthenticated={isAuthenticated} />
                  <Route path='/login' component={Login} />
                  <ProtectedRoute path="/add" component={Newquestion} isAuthenticated={isAuthenticated} />
                  <ProtectedRoute path="/leaderboard" component={Leaderboard} isAuthenticated={isAuthenticated} />
                  <ProtectedRoute path="/questions/:id" component={ QuestionsBank } isAuthenticated={isAuthenticated} />
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

App.propTypes = {
  login: PropTypes.object
}


export default connect(mapStateToProps)(App);
