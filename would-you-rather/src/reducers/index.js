import { combineReducers } from 'redux'
import authedUser from './authUser'
import users from './users'
import questions from './polls'
import login from "./login";

export default combineReducers({
    authedUser,
    users,
    questions,
    login,
});