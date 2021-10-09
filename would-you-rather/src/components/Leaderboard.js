import React, { Component } from "react";
import { connect } from "react-redux";

class Leaderboard extends Component {

    render() {
       
        const { users, userIDs, topAnswers, topQuestions} = this.props;       

        return (
            <div className="board">                
                
                <h4>Leaderboard </h4>
                <table align="center" className="sortable" id="mytable">
                    <thead>

                    <tr>
                        <th>Names</th>
                        <th >No of Answered Questions</th>
                        <th>No of Published Questions</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userIDs.map((id, index) => (  
                                            <tr key={id} className="item"> 
                                                <td><img src={users[id].avatarURL} alt={id} width="50" height="50"  /> {users[id].name}</td>
                                                <td> {topAnswers[index][id]}</td>
                                                <td>{topQuestions[index][id]}</td>
                                                <td>{topAnswers[index][id] + topQuestions[index][id]}</td>
                                            </tr>
                                )
                    )}
                    </tbody>
                </table>

                
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, login} ) {

    const userIDs = Object.keys(users);
    
    const topAnswers = userIDs.map((id) => ({ [id] : Object.keys(users[id].answers).length}) )
    const topQuestions = userIDs.map((id) => ({ [id] : users[id].questions.length}) )

    const sortedUsers = userIDs.sort( (a,b) => Object.keys(users[b].answers).length  - Object.keys(users[a].answers).length )

    console.log(sortedUsers)


    return {
        users,
        userIDs,
        authedUser,
        topAnswers,
        topQuestions,
        login

    }
}

export default connect(mapStateToProps)(Leaderboard);