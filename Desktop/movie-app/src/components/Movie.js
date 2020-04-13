import React from 'react';
import axios from 'axios';

export default class Movie extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            movie: {
                data: {},
                loading: false,
                error: false
            }
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            movie: {
                ...this.state.movie,
                loading: true
            }
        });

        axios.get(process.env.REACT_APP_ENDPOINTMOVIES + "&i="
        + this.props.match.params.id)
        .then(response => {
            this.setState({
                ...this.state,
                movie: {
                    data: {...response.data},
                    loading: false,
                    error: false
                }
            })
        })
        .catch(error => console.log(error))
    }
    render(){
        return (
            <div className="movieField">
                <h1>{this.state.movie.data.Title}</h1>
                <p>{this.state.movie.data.Plot}</p>
                <h3>Rating: {this.state.movie.data.imdbRating}</h3>
            </div>
        )
    }
}
