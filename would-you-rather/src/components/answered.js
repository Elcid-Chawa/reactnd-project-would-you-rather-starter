import React, { Component } from 'react';
import { connect } from 'react-redux';

class Answered extends Component {


    render() {

        const { question, users, authedUser } = this.props

        if ( question === null ){
            return <p>No Answered question exists!</p>
        }

        const {
            author, optionOne, optionTwo
        } =  question

        const avatarURL = users[author].avatarURL

        const totalVotes = optionOne.votes.length + optionTwo.votes.length

        const isOptionOneVoted = optionOne.votes.includes(authedUser)
        const isOptionTwoVoted = optionTwo.votes.includes(authedUser)

      

        //const numberofUses = users.length

        return (
            <div className="answered-poll">

                <div className="chip">
                    <img src={avatarURL} alt={authedUser} width="96" height="96" />
                    {author} asked, Would you rather?
                </div>

                <div className={isOptionOneVoted ? "option-one voted" : "option-one"}>
                    <h4>A: {optionOne.text}</h4>
                    <p>{optionOne.votes.length} out of {totalVotes}</p>
                    <p>{(optionOne.votes.length/totalVotes * 100 ).toFixed(2)}% voted</p>
                </div>
                
                <div className={isOptionTwoVoted ? "option-two voted" : "option-two "}>
                    <h4>B: {optionTwo.text}</h4>
                    <p>{optionTwo.votes.length} out of {totalVotes}</p>
                    <p>{(optionTwo.votes.length/totalVotes * 100).toFixed(2) }% voted</p>
                </div>

            </div>
        );
    }
}


function mapStateToProps({authedUser, questions, users}, {id}) {
    const question = questions[id]
    return {
        authedUser,
        question: question,
        users,
        
    }
    
}

export default connect(mapStateToProps)(Answered);