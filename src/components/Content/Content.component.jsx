import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideosList from '../VideosList/VideosList.component';
import { getVideos } from '../../services/videoService';

const useStyles = makeStyles({
  content: {
    padding: 20,
  },
});

export default function Content() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos(setVideos);
  }, []);


  const classes = useStyles();

  return (
    <main className="container">
      <Grid className={classes.content} container spacing={10}>
        <VideosList videos={videos} />
      </Grid>
    </main>
  );
}
