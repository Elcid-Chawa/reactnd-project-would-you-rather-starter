import { saveQuestionAnswer } from "../utils/api"

export const CAST_VOTE = 'CAST_VOTE'

export function castVote(answer) {
    return {
        type: CAST_VOTE,
        answer,
    }    
}

export function handleVote(answer){
    return (dispatch) => {
            saveQuestionAnswer(answer).then(() => {
                dispatch(castVote(answer))
            })
    }
}