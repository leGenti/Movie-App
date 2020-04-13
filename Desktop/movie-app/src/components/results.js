import React from "react";
import { Link } from "react-router-dom";
import {
  Grid, Card, CardActionArea, 
  CardMedia, CardContent,
  Typography, Button,
  CardActions, IconButton
} from "@material-ui/core";
import  ShareIcon  from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { slugify } from "../Helpers";

export default ({ movies }) => (
  <>
    <Grid container spacing={1}>
      {movies.map(movie => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={movie.Poster}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {movie.Title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {movie.Plot}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Release date: {movie.Year}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon className="favo" />
              </IconButton>
              <IconButton aria-label="share">
                  <ShareIcon className="share"/>
              </IconButton>
              <Link to={`movie/${movie.imdbID}/${slugify(movie.Title)}`}>
                <Button className="infoBtn" size="small" variant="outlined" color="primary">
                  More info
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  </>
);

