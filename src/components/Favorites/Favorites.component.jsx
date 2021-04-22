import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch, useLocation } from 'react-router';
import VideosList from '../VideosList/VideosList.component';
import { useGlobal } from '../../providers/GlobalContext/GlobalContext';
import VideoDetails from '../VideoDetails/VideoDetails.component';

const useStyles = makeStyles({
  content: {
    padding: 20,
  },
});

export default function Favorites() {
  const globalContext = useGlobal();
  const [videos, setVideos] = useState([]);
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    setVideos(globalContext.favorites);
  }, [globalContext.favorites]);

  return (
    <main className="container">
      {location.pathname === '/favorites' ? (
        <Grid className={classes.content} container spacing={10}>
          <VideosList videos={videos} />
        </Grid>
      ) : (
        ''
      )}
      <Switch>
        <Route path="/favorites/:videoId">
          <VideoDetails />
        </Route>
      </Switch>
    </main>
  );
}
