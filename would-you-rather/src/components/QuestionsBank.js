import React, { Component } from "react";
import { connect } from "react-redux";
import {handleVote} from "../actions/voting";

class QuestionsBank extends Component {

    state = {
        authedUser: this.props.authedUser,
        qid: this.props.question.id,
        answer: undefined
    }

    castVote = (e) => {

        this.setState(() => ({
            answer: e.target.value
        }))

    }

    handleVoting = (e) => {
        e.preventDefault()
        
        const {authedUser, qid, answer} = this.state
        this.props.dispatch(handleVote({authedUser, qid, answer}));
    }
    
    render(){
    
        const { authedUser, question, users, url } = this.props

        if ( question === null ){
            return <p>No unanswered question exists!</p>
        }

        const {
            author, optionOne, optionTwo
        } =  question

        const avatarURL = users[author].avatarURL
        const totalVotes = optionOne.votes.length + optionTwo.votes.length
        const isOptionOneVoted = optionOne.votes.includes(authedUser)
        const isOptionTwoVoted = optionTwo.votes.includes(authedUser)

        return(
            <div>{url === '/questions/:id' &&(<div className="unanswered-poll">                
                    <div className="chip">
                        <img src={avatarURL} alt="Person" width="96" height="96" />
                        {author}
                    </div>
                    <div className="question-info">
                        <h4>Would you rather? </h4>
                        <form onSubmit={this.handleVoting}>
                            <div>
                                <input 
                                    type="radio" 
                                    name='vote' 
                                    value='optionOne'
                                    onChange={this.castVote}
                                />
                                <label className="choose-option" > A: {optionOne.text}</label>
                            </div>
                            <div>
                                <input 
                                    type="radio" 
                                    name='vote'
                                    value='optionTwo'
                                    onChange={this.castVote} 
                                />
                                <label className="choose-option" > B: {optionTwo.text}</label>
                            </div>
                            <div>
                                <button type="submit">Vote</button>
                            </div>
                        </form>
                    </div>
                
                </div>)}
                {url === '/answer/:id' &&(<div className="answered-poll">

                    <div className="chip">
                        <img src={avatarURL} alt={authedUser} width="96" height="96" />
                        {author} asked, Would you rather?
                    </div>

                    <div className={isOptionOneVoted ? "option-one voted" : "option-one"}>
                        <h4>A: {optionOne.text}</h4>
                        <p>{optionOne.votes.length} out of {totalVotes}</p>
                        <p>%{optionOne.votes.length/totalVotes * 100 } voted</p>
                    </div>

                    <div className={isOptionTwoVoted ? "option-two voted" : "option-two "}>
                        <h4>B: {optionTwo.text}</h4>
                        <p>{optionTwo.votes.length} out of {totalVotes}</p>
                        <p>%{optionTwo.votes.length/totalVotes * 100 } voted</p>
                    </div>

                    </div>)}
            </div>
        )
    }
}

function mapStateToProps({authedUser, questions, users}, { match } ) {

    const question = questions[match.params.id];

    const url = match.path

    return {
        question,
        authedUser,
        users,
        url
    }
}

export default connect(mapStateToProps)(QuestionsBank);