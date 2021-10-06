import {
    _getQuestion,
    _getQuestions,
    _getUser,
    _getUsers,
    _saveQuestion,
    _saveQuestionAnswer,
} from './_DATA.js'

export function getInitialData (){
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
}

export function saveQuestion (questions){
    return _saveQuestion(questions)
}

export function saveQuestionAnswer (answer){
    return _saveQuestionAnswer(answer)
}

export function getUser(uid) {
    return _getUser(uid)
}

export function getQuestion(qid) {
    return _getQuestion(qid)
}
