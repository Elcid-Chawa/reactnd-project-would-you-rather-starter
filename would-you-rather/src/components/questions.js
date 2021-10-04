import React, { Component } from "react";
import { connect } from "react-redux";

class Question extends Component {  

    render() {
        const { question, users } = this.props

        if ( question === null ){
            return <p>No unanswered question exists!</p>
        }

        const {
            author, optionOne, optionTwo, 
        } =  question

        const avatarURL = users[author].avatarURL

        return (

                <div className="unanswered-poll">                
                    <div className="chip">
                        <img src={avatarURL} alt="Person" width="96" height="96" />
                        {author}
                    </div>
                    <div className="question-info">
                        <h4>Would you rather? </h4>
                        <p className="choose-option">A: {optionOne.text}</p>
                        <p className="choose-option">B: {optionTwo.text}</p>
                    </div>
                
                </div>
            
        )
    }
}

function mapStateToProps({authedUser, users, questions, login}, { id } ) {
    const question = questions[id];

    return {
        authedUser,
        question: question,
        users,
        login

    }
}

export default connect(mapStateToProps)(Question);