import React from 'react';
import Form from './components/Form';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


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

  componentDidMount(){
    
  }

  searchMovies = (str) => {
    this.setState({
      movies: {
        ...this.state.movies,
        loading: true
      }
    })
    axios.get("https://www.omdbapi.com/?apikey=ae94de9&s=" + str)
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
      <div className="App">
        <h1>Movie Searcher</h1>
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
      </div>
      </Router>
    );
  }
}

export default App;
