import React, { Component } from "react";
import { connect } from "react-redux";
import Menu from './menu'

class Newquestion extends Component {
    render() {
       

        return (
            <div className="form">                
                
                <form method="post">
                    <h4>Would you rather? </h4>
                    <p className="choose-option">A: </p>
                    <input type="text" placeholder="" />

                    <p className="choose-option">B: </p>
                    <input type="text" placeholder="" />

                    <button type="submit">Submit</button>
                </form>
                
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

export default connect(mapStateToProps)(Newquestion);