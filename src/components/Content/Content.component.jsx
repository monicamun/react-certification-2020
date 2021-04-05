import React, { useContext, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideosList from '../VideosList/VideosList.component';
import { getVideos } from '../../services/videoService';
import SearchContext from '../../providers/SearchContext';

const useStyles = makeStyles({
  content: {
    padding: 20,
  },
});

export default function Content() {
  const [videos, setVideos] = useState([]);
  const searchContext = useContext(SearchContext);
  const classes = useStyles();

  useEffect(() => {
    console.log(searchContext.searchText);
    getVideos(setVideos, searchContext.searchText);
  }, [searchContext.searchText]);

  return (
    <main className="container">
      <Grid className={classes.content} container spacing={10}>
        <VideosList videos={videos} />
      </Grid>
    </main>
  );
}
