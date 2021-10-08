import { saveQuestionAnswer } from "../utils/api"
import { showLoading, hideLoading } from "react-redux-loading";
import { handleUpdateVote } from "./polls";

export const CAST_VOTE = 'CAST_VOTE'

export function castVote(answer, hasVotted) {
    return {
        type: CAST_VOTE,
        answer,
        hasVotted
    }    
}

export function handleVote(qid, answer){
    return (dispatch, getState) => {
        dispatch(showLoading())
        const { authedUser, votes } = getState();
        return saveQuestionAnswer({
            authedUser,
            qid,
            answer
        }).then(() => {
                dispatch(castVote({authedUser, qid, answer}, votes.hasVotted))
            .then(() => dispatch(handleUpdateVote(qid, answer)))
            .then(() => dispatch(hideLoading()))
            });
    }
}