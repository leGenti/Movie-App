import React, { Component } from 'react';
import { TextField, Button } from "@material-ui/core";

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
                value: e.target.value, // of gwn value => value: e.target.value
                error: false 
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
                <TextField
                variant='outlined' 
                type="text" 
                className={this.state.searchField.error ? "error": ""} 
                value={this.state.searchField.value} 
                onChange={this.changeHandler}
                />
                <Button type="submit" className="searchBtn" variant="contained" color="primary">
                    Search
                </Button>
            </form> 
        )
    }
}
