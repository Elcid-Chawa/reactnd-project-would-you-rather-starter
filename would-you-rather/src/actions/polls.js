import { saveQuestion } from "../utils/api";
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_POLLS = 'RECEIVE_POLLS';
export const ADD_POLLS = 'ADD_POLLS';

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_POLLS,
        questions,
    }
}

export function addQuestion (question) {
    return {
        type: ADD_POLLS,
        question
    }
}

export function handleAddQuestions (optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());

        return saveQuestion({ 
                optionOneText: optionOneText, 
                optionTwoText: optionTwoText, 
                author: authedUser 
            })
            .then((question) => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()));
    }
}
