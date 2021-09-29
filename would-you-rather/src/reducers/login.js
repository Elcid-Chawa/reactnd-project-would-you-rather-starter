import { LOGIN_USER } from "../actions/login";

export default function login(state = null, action) {
    switch (action.type){
        case LOGIN_USER:
            return  action.authedUser
            
        default:
            return state
    }
    
}