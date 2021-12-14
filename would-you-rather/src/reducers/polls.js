import { ADD_POLLS, RECEIVE_POLLS, UPDATE_VOTE } from "../actions/polls";

export default function questions ( state = {}, action){
    switch(action.type){
        case RECEIVE_POLLS :
            return {
                ...state,
                ...action.questions
            }

        case ADD_POLLS :
            return {
                ...state,
                [action.question.id]: action.question
            }

        case UPDATE_VOTE:
            return {
                ...state,
                [action.question.id] : {
                    ...action.question
                }

                
            }

        default :
            return state
    }
}