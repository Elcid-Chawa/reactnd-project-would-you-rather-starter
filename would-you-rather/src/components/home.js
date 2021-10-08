import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Answered from "./answered";
import Question from "./questions";

class Home extends Component {

    constructor(props) {
        super(props)
        this.openPool = this.openPool.bind(this);
    }

    state = {
        showAnswered: false,
    }

    openPool = (e, poll) => {
        e.preventDefault();
        // Get all elements with class="tablinks" and remove the class "active"
        const tablinks = document.getElementsByClassName("tablinks");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

       if (poll === "answered") {
           this.setState(() => ({
               showAnswered: true
           }))
       }

       if (poll === "unanswered") {
            this.setState(() => ({
                showAnswered: false
            }))
        }
        
        e.currentTarget.className += " active";

    }

    render (){

        const { authedUser, unanswered, questionsId } = this.props;

        const { showAnswered } = this.state;

        if (authedUser === null || undefined){
            return <Redirect to='/login' />
        }

        return (
            <div className="question-container">
                
                <div className="tab">
                    <button className="tablinks active" id="unanswered" onClick={(e) => this.openPool(e,'unanswered')}>Unanswered Polls</button>
                    <button className="tablinks" id="answered" onClick={(e) => this.openPool(e, 'answered')}>Answered Polls</button>
                </div>
                    
                {!showAnswered && (<div className="question-wrap">
                    <h3 className="center">Unanswered Polls</h3>
                    {(unanswered.length === 0) ? <p>All questions Answered</p>
                    : <ul>
                        {unanswered.map((id) => (
                            <li key={id}>
                                    <Link to ={`/questions/${id}`} ><Question id={id} /></Link>
                            </li>
                        ))}
                    </ul>}
                </div> )}

                {showAnswered && (<div className="question-wrap">
                    <h3 className="question-wrap">Answered Polls</h3>
                    {(questionsId.length === 0) ? <p>No Questions Answered yet.</p>
                    : <ul>
                        {questionsId.map((id) => (
                                <li key={id}>
                                    <Link to ={`/answer/${id}`} ><Answered id={id} /></Link>
                                </li>
                        ))}
                    </ul>}
                </div>)}
                    
            </div>
        );
    
    }
        
}

function mapStateToProps({questions, users, authedUser}) {


    const answeredId =  authedUser !== (null || undefined) ? users[authedUser].answers : {};
    const unanswered =  Object.keys(questions).filter(k => { return !Object.keys(answeredId).includes(k)});

    return {
        questionsId: Object.keys(answeredId)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        unanswered: Object.values(unanswered)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        authedUser,
       
    }
}

export default connect(mapStateToProps)(Home)