import { CAST_VOTE } from "../actions/voting";

export default function votes (state = {}, action){
    switch(action.type){
        case CAST_VOTE :
            return {
                ...state,
                answer: action.answer,
                hasVotted: action.hasVotted
            }

        default :
            return state
    }
}