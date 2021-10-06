import { saveQuestionAnswer, getUser } from "../utils/api";

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER_VOTE = 'ADD_USER_VOTE'

export function receiveUsers (users){
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function addUserVote(user, authedUser, qid, vote) {
    return {
        type: ADD_USER_VOTE,
        user,
        authedUser,
        qid,
        vote,
    }    
}


export function handleVote(qid, answer){
    return (dispatch, getState) => {
        const { authedUser } = getState();
        return saveQuestionAnswer({
            authedUser,
            qid,
            answer
        }).then(() => getUser(authedUser)
                        .then((user) => dispatch(addUserVote(user, authedUser, qid, answer)))
            );
    }
}