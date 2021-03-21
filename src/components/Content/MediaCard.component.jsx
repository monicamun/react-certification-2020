import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  media: {
    height: 140,
  },
  content: {
    padding: 30
  }

});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} >
      <Card className={classes.root}>
        <CardMedia className={classes.media} image={props.imageUrl} title="" />
        <CardActionArea>
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.body}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
