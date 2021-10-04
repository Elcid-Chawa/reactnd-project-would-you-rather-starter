import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


class QuestionsBank extends Component {  

    render() {
        const { question, users, qid } = this.props

        if ( question === null ){
            return <p>No unanswered question exists!</p>
        }

        const {
             id
        } =  question

        console.log(qid)

        return (
            <div>
                {qid}
            </div>
            
        )
    }
}

function mapStateToProps({authedUser, users, questions}, { props } ) {
    const { qid } = props.match.params;
    console.log(qid)
    const question = questions[qid];

    return {
        authedUser,
        question: question,
        users,
        qid

    }
}

export default withRouter(connect(mapStateToProps))(QuestionsBank);