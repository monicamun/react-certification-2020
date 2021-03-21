import React from 'react';
import MediaCard from './MediaCard.component';
import { Grid } from '@material-ui/core';
import { getVideos } from '../../services/videoService';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  content: {
    padding: 100,
    marginTop: 1000
  }
});



export default function Content() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const videosResponse = await getVideos();
      setVideos(videosResponse);
    }
    fetchData()
  }, []);

  const classes = useStyles();

  return (
    <main className="container">
      <Grid className={classes.content} container spacing={10} > 
        {videos? videos.map(video => (
          <MediaCard key={video.etag} title={video.title} imageUrl={video.imageUrl} body={video.description} />
        )) : "Loading..."}
      </Grid>
    </main>
  );
}
