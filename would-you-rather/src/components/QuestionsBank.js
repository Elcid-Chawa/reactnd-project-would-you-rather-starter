import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter, Route } from "react-router-dom";
import Question from "./questions";
import Answered from "./answered";

class QuestionsBank extends Component {  

    render() {
        const { question, users, isAnswered } = this.props

        if ( question === null ){
            return <p>No unanswered question exists!</p>
        }

        const {
             id
        } =  question

        console.log(isAnswered)

        return (
            <div>
                {isAnswered && <p>Answered {id}</p>}
                {!isAnswered && <p>Not Answered {id}</p>}
            </div>
            
        )
    }
}

function mapStateToProps({authedUser, users, questions}, { id, isAnswered } ) {
    const question = questions[id];

    return {
        authedUser,
        question: question,
        users,
        isAnswered

    }
}

export default connect(mapStateToProps)(QuestionsBank);