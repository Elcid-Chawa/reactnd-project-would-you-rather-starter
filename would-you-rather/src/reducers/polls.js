import { RECEIVE_POLLS } from "../actions/polls";

export default function questions ( state = {}, action){
    switch(action.type){
        case RECEIVE_POLLS :
            return {
                ...state,
                ...action.questions
            }

        default :
            return state
    }
}