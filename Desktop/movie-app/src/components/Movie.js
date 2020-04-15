import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  ExpansionPanel, ExpansionPanelSummary,
  ExpansionPanelDetails, Typography
} from "@material-ui/core";

import Loading from "./Loading";

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
            <>
              <Link to="/">
                <ArrowBackIcon color="primary" className="arrowBack" />
              </Link>
              {this.state.movie.loading && <Loading />}
              {Object.keys(this.state.movie.data).length > 1 && (
              <>
                <div>
                  <h1 className="h1movie">{this.state.movie.data.Title}</h1>
                </div>
                <img
                  src={this.state.movie.data.Poster}
                  alt={this.state.movie.data.Title}
                  className='movie-img'
                />
                <div className='expocontainer'>
                <ExpansionPanel className="expansion">
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography><strong>Plot</strong></Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>{this.state.movie.data.Plot}</Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel className="expansion">
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography><strong>Cast</strong></Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                      <Typography>{this.state.movie.data.Actors}</Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel className="expansion">
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography><strong>More info</strong></Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="panel">
                    <Typography>
                      <strong>Released: </strong>
                      {this.state.movie.data.Released}
                    </Typography>
                    <Typography>
                      <strong>Rating: </strong>
                      {this.state.movie.data.imdbRating}
                    </Typography>
                    <Typography>
                      <strong>Genre: </strong> {this.state.movie.data.Genre}
                    </Typography>
                    <Typography>
                      <strong>Runtime: </strong>
                      {this.state.movie.data.Runtime}
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                </div>
              </>
            )}
          </>
        );
    }
}
