import { saveQuestion } from "../utils/api";

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

export function handleAddQuestions (question) {
    return (dispatch) => {
        saveQuestion(question).then((results) => {
            console.log(results)
            dispatch(addQuestion(question));
        })
    }
}
