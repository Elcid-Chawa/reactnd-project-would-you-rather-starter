import React, { Component } from "react";
import { connect } from "react-redux";
import Menu from './menu'

class Leaderboard extends Component {
    render() {
       

        return (
            <div className="board">                
                
                <h4>Leaderboard</h4>     
                
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, { id } ) {
    const question = questions[id];

    return {
        authedUser,
        question: question,
        users,

    }
}

export default connect(mapStateToProps)(Leaderboard);