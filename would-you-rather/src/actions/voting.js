import { saveQuestionAnswer } from "../utils/api"
import { showLoading, hideLoading } from "react-redux-loading";

export const CAST_VOTE = 'CAST_VOTE'

export function castVote(answer) {
    return {
        type: CAST_VOTE,
        answer,
    }    
}

export function handleVote(qid, answer){
    return (dispatch, getState) => {
        const { authedUser } = getState();
        return saveQuestionAnswer({
            authedUser,
            qid,
            answer
        }).then(() => {
                dispatch(castVote({authedUser, qid, answer}))
            });
    }
}