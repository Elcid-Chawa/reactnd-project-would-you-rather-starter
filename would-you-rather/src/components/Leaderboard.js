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
                j = tr[i].getElementByTagName("TD")[1];
                k = tr[i+1].getElementByTagName("td")[1];

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
       
        const { users, userIDs} = this.props;

        return (
            <div className="board">                
                
                <h4>Leaderboard </h4>
                <table align="center" className="sortable" id="mytable">
                    <thead>

                    <tr>
                        <th>Names</th>
                        <th onClick={this.sortTable}>No of Answered Questions</th>
                        <th>No of Published Questions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userIDs.map((id) => (  
                                            <tr key={id} className="item"> 
                                                <td>{id}</td>
                                                <td> {Object.keys(users[id].answers).length}</td>
                                                <td>{users[id].questions.length}</td>
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

    const topAnswers = userIDs.map((id) => ({ id : users[id].answers}) )

    return {
        users,
        userIDs,
        topAnswers,
        authedUser,
        login

    }
}

export default connect(mapStateToProps)(Leaderboard);