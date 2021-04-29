import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideosList from '../VideosList/VideosList.component';
import { useGlobal } from '../../providers/GlobalContext/GlobalContext';

const useStyles = makeStyles({
  content: {
    padding: 20,
  },
});

export default function Favorites() {
  const globalContext = useGlobal();
  const [videos, setVideos] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setVideos(globalContext.favorites);
  }, [globalContext.favorites]);

  return (
    <main className="container">
      <Grid className={classes.content} container spacing={10}>
        <VideosList videos={videos} />
      </Grid>
    </main>
  );
}
