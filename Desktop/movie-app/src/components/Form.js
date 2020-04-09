import React, { Component } from 'react'

export default class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchField : {
                value: "",
                error: false
            }
        }
    }

    changeHandler = (e) => {
       this.setState({
            searchField : {
                ...this.state.searchField,
                value: e.target.value // of gwn value => value: e.target.value
            }  
       }) 
    }

    submitHandler = (e) => {
        e.preventDefault();
        if(this.state.searchField.value === ""){
            this.setState({
                searchField: {
                    ...this.state.searchField,
                    error: true
                }
            });
        } else {
            this.setState({
                searchField: {
                    ...this.state.searchField,
                    error: false
                }
            });
            this.props.searchMovies(this.state.searchField.value)
        }
        

        
    }
    render() {
        return (
            <form action="" onSubmit={this.submitHandler}>
                <input 
                type="text" 
                className={this.state.searchField.error ? "error": ""} 
                value={this.state.searchField.value} 
                onChange={this.changeHandler}
                />
                <input type="submit" value="search"/>
            </form> 
        )
    }
}
