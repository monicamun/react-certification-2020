import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideosList from '../VideosList/VideosList.component';
import { fetchVideos } from '../../services/videoService';
import { useGlobal } from '../../providers/GlobalContext/GlobalContext';

const useStyles = makeStyles({
  content: {
    padding: 20,
  },
});

export default function Content() {
  const globalContext = useGlobal();
  const [videos, setVideos] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function loadVideos() {
      const responseVideos = await fetchVideos(globalContext.searchState);
      setVideos(responseVideos);
    }
    loadVideos();
  }, [globalContext.searchState]);

  return (
    <main className="container">
      <Grid className={classes.content} container spacing={10}>
        <VideosList videos={videos} />
      </Grid>
    </main>
  );
}
