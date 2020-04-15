import React from 'react';
import Form from './components/Form';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Typography, AppBar, Toolbar} from '@material-ui/core';


import Results from './components/results';
import Loading from './components/Loading';
import Movie from './components/Movie';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      movies: {
        loading: false,
        error: false,
        data: []
      }
    }
  }

  searchMovies = (str) => {
    this.setState({
      movies: {
        ...this.state.movies,
        loading: true
      }
    })
    axios.get(process.env.REACT_APP_ENDPOINTMOVIES + "&s=" + str)
    .then(results => {
      console.log(results)
      this.setState({
        movies:{
          ...this.state.movies,
          data: results.data.Search,
          loading: false
        }
      });
    })
    .catch(error => {
      console.log(error);
    })
  }

  render(){
    return (
      <Router>
        <AppBar position="static" >
          <Toolbar variant="dense">
              <Typography variant="h3">
                Movies & Series
              </Typography>
          </Toolbar>
        </AppBar>
        <Switch>
            <Route exact path="/" render={()=>(
              <>
              <Form searchMovies={this.searchMovies}/>
              {this.state.movies.loading && <Loading />} 
              {this.state.movies.data.length !== 0 && <Results movies={this.state.movies.data}/>}
              </>
            )}
            />
            <Route path="/movie/:id/:title" render={(props)=><Movie {...props}/>}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
