import { LOGIN_USER, LOGOUT } from "../actions/login";

export default function login(state = {}, action) {
    switch (action.type){
        case LOGIN_USER:
            return  {
                ...state,
                isLoggedin: action.isLoggedin,
                payload: action.payload
            }

        case LOGOUT:
            return {
                ...state,
                isLoggedin: action.isLoggedin,
                payload: action.payload
            }
            
        default:
            return state
    }
    
}