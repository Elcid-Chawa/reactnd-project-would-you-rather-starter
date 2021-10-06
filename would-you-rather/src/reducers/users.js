import { RECEIVE_USERS, ADD_USER_VOTE } from "../actions/users";

export  default function users ( state = {}, action){
    switch(action.type){
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            }

        case ADD_USER_VOTE:
            return {
                ...state,
                [action.authedUser]: {  ...action.user,
                                        answers: {
                                       ...action.user.answers,
                                       [action.qid] : action.vote 
                                    }
                }

            }

        default : 
            return state
    }
}