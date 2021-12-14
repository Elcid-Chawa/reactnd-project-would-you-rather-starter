import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

class Leaderboard extends Component {

    render() {
       
        const { users, sortedUsers} = this.props;       

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
                    {sortedUsers.map((id) => (  
                                            <tr key={id} className="item"> 
                                                <td><img src={users[id].avatarURL} alt={id} width="50" height="50"  /> {users[id].name}</td>
                                                <td> {Object.keys(users[id].answers).length }</td>
                                                <td>{users[id].questions.length}</td>
                                                <td>{Object.keys(users[id].answers).length + users[id].questions.length}</td>
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
    
    const sortedUsers = userIDs.sort( (a,b) => (Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length))

    return {
        users,
        authedUser,
        sortedUsers,
        login

    }
}

Leaderboard.propTypes = {
    users: PropTypes.object.isRequired,
    sortedUsers: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(Leaderboard);