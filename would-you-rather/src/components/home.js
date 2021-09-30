import React, { Component } from "react";
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './login'
import QuestionsBank from "./QuestionsBank";

class Home extends Component {

    state = {
        showAnswered: false,
    }

    openPool = (e, poll) => {

        // Get all elements with class="tablinks" and remove the class "active"
        const tablinks = document.getElementsByClassName("tablinks");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

       if (poll === "answered") {
        console.log(e)
           this.setState(() => ({
               showAnswered: true
           }))
       }

       if (poll === "unanswered") {
           console.log(poll)
            this.setState(() => ({
                showAnswered: false
            }))
        }
        
        e.currentTarget.className += " active";

    }

    render (){

        const { showAnswered } = this.state;

        const { authedUser, login } = this.props;

        return (
            <div className="question-container">
                
                <div className="tab">
                    <button className="tablinks active" id="unanswered" onClick={(e) => this.openPool(e,'unanswered')}>Unanswered Polls</button>
                    <button className="tablinks" id="answered" onClick={(e) => this.openPool(e, 'answered')}>Answered Polls</button>
                </div>
                    
                {!showAnswered && (<div className="question-wrap">
                    <h3 className="center">Unanswered Polls</h3>
                    <ul>
                        {this.props.unanswered.map((id) => (
                            <li key={id}>
                                    <Link to={`/questions/${id}`}><QuestionsBank id={id} isAnwered={false} /></Link>
                            </li>
                        ))}
                    </ul>
                </div> )}

                {showAnswered && (<div className="question-wrap">
                    <h3 className="question-wrap">Answered Polls</h3>
                    <ul>
                        {this.props.questionsId.map((id) => (
                                <li key={id}>
                                    <Link to ={`/questions/${id}`} ><QuestionsBank id={id} isAnwered={true} /></Link>
                                </li>
                        ))}
                    </ul>
                </div>)}
                    
            </div>
        );
    
    }
        
}

function mapStateToProps({questions, users, authedUser, login}) {


    const answeredId =  login.payload.answers ;
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