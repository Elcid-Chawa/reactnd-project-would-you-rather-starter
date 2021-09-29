import {
    _getQuestions,
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

export function saveQuestions (questions){
    return _saveQuestion(questions)
}

export function saveQuestionAnswer (answer){
    return _saveQuestionAnswer(answer)
}
