import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleAddQuestions } from "../actions/polls";

class Newquestion extends Component {

    constructor(props) {
        super(props)
        this.setOption = this.setOption.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            formValues: {
                optionOne: '',
                optionTwo: ''
            },

            toHome: false,
        }
    }

    

    setOption = (e) => {
        e.preventDefault()
        this.setState((currentState) => (
            currentState.formValues[e.target.name] = e.target.value
        ));
    }

    handleSubmit = (e) => {
        e.preventDefault()

        if ((this.state.formValues.optionOne !== '' ) && (this.state.formValues.optionTwo !== '')){

            this.setState(() => ({
                toHome: true 
            }))

            const author  = this.props.authedUser;
            const optionTextOne = this.state.formValues.optionOne;
            const optionTextTwo = this.state.formValues.optionTwo;
            console.log(optionTextOne)
            this.props.dispatch(handleAddQuestions({ optionTextOne, optionTextTwo, author }));
        }

    }

    render() {

        const { formValues, toHome } = this.state;

        
       
        if(toHome === true ){
            return <Redirect to="/" />
        }

        return (
            <div className="form">                
                
                <form >
                    <h4>Would you rather? </h4>
                    <div>
                    <label className="choose-option">A: </label>
                    <input type="text" name="optionOne" value={formValues['optionOne']} placeholder="" onChange={this.setOption} />
                    </div>

                    <div>
                    <label className="choose-option">B: </label>
                    <input type="text" name="optionTwo" value={formValues['optionTwo']} placeholder="" onChange={this.setOption} />
                    </div>

                    <div>
                        <button type="submit" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </form>
                
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, questions, login}, { id } ) {
    const question = questions[id];

    return {
        authedUser,
        question: question,
        users,
        login

    }
}

export default connect(mapStateToProps)(Newquestion);