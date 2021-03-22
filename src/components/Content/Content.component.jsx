import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MediaCard from './MediaCard.component';
import { getVideos } from '../../services/videoService';

const useStyles = makeStyles({
  content: {
    padding: 20,
  },
});

export default function Content() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const videosResponse = await getVideos();
      setVideos(videosResponse);
    }
    fetchData();
  }, []);

  const classes = useStyles();

  return (
    <main className="container">
      <Grid className={classes.content} container spacing={10}>
        {videos
          ? videos.map((video) => (
              <MediaCard
                key={video.etag}
                title={video.title}
                imageUrl={video.imageUrl}
                body={video.description}
              />
            ))
          : 'Loading...'}
      </Grid>
    </main>
  );
}
