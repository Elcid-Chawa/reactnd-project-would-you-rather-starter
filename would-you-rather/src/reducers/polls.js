import { ADD_POLLS, RECEIVE_POLLS } from "../actions/polls";

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

        default :
            return state
    }
}