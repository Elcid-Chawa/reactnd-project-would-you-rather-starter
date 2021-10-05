import { combineReducers } from 'redux'
import authedUser from './authUser'
import users from './users'
import questions from './polls'
import login from "./login";
import votes from './voting';

export default combineReducers({
    authedUser,
    users,
    questions,
    login,
    votes
});