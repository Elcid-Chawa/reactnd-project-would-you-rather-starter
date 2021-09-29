export const RECEIVE_POLLS = 'RECEIVE_POLLS'

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_POLLS,
        questions,
    }
}