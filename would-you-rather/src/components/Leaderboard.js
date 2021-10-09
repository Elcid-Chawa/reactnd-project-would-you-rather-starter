import React, { Component } from "react";
import { connect } from "react-redux";

class Leaderboard extends Component {

    constructor(props){
        super(props);
        this.sortTable = this.sortTable.bind(this);
    }

    sortTable = (e) => {
        e.preventDefault()

        let table, tr, switching, i, j, k, shouldSwithch;
        table = document.getElementById("mytable");
        switching = true;

        while(switching){
            switching=false;
            tr = table.rows;

            for(i=1; i< (tr.length -1); i++){
                shouldSwithch = false;
                j = tr[i].getElementByTagName("TD")[3];
                k = tr[i+1].getElementByTagName("td")[3];

                if(Number(j.innerHTML) > Number(k.innerHTML)){
                    shouldSwithch= true;
                    break;
                }
            }
            if(shouldSwithch){
                tr[i].parentNode.insertBefore(tr[i+1], tr[i]);
                switching = true;
            }
        }
    }

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
                        <th onClick={this.sortTable}>Total</th>
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