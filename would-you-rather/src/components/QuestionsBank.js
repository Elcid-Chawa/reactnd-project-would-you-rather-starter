import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { handleVote } from "../actions/users";
import { updateVote } from "../actions/voting";

class QuestionsBank extends Component {

    state = {
        qid: '',
        answer: '',
        hasVotted: false
    }

    castVote = (e, id) => {

        this.setState(() => ({
            qid: id,
            answer: e.target.value,
        }))

    }

    handleVoting = (e) => {
        e.preventDefault()

        this.setState(() => ({
            hasVotted: true
        }));
        
        const {qid, answer} = this.state;
        this.props.dispatch(handleVote(qid, answer));
        this.props.dispatch(updateVote(qid, answer));
    }
    
    render(){

        const { hasVotted } = this.state;
    
        const { authedUser, question, users, url } = this.props

        if ( question === null || undefined ){
            return <div><p>No unanswered question exists!</p><Link to='/'><button>Go home</button></Link></div>
        }

        if (hasVotted){return <Redirect to='/' />}

        const {
            author, optionOne, optionTwo, id
        } =  question

        const avatarURL = users[author].avatarURL
        const totalVotes = optionOne.votes.length + optionTwo.votes.length
        const isOptionOneVoted = optionOne.votes.includes(authedUser)
        const isOptionTwoVoted = optionTwo.votes.includes(authedUser)

        return(
            <div>
                {url === '/questions/:id' &&(<div className="unanswered-poll">                
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
                                    onChange={(e) => this.castVote(e, id)}
                                    required
                                />
                                <label className="choose-option" > A: {optionOne.text}</label>
                            </div>
                            <div>
                                <input 
                                    type="radio" 
                                    name='vote'
                                    value='optionTwo'
                                    onChange={(e) => this.castVote(e, id)}
                                    required
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
                        <p>{(optionOne.votes.length/totalVotes * 100).toFixed(2)}% voted</p>
                    </div>

                    <div className={isOptionTwoVoted ? "option-two voted" : "option-two "}>
                        <h4>B: {optionTwo.text}</h4>
                        <p>{optionTwo.votes.length} out of {totalVotes}</p>
                        <p>{(optionTwo.votes.length/totalVotes * 100).toFixed(2)}% voted</p>
                    </div>

                    <Link to='/'><button>Return</button></Link>

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