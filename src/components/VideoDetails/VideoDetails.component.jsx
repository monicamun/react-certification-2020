import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { Grid } from '@material-ui/core';
import { loadVideo } from '../../services/videoService';

export default function VideoDetails() {
  const [video, setVideo] = useState();
  const location = useLocation();
  const { videoId } = useParams();

  useEffect(() => {
    if (location.video === undefined || location.video === null) {
      loadVideo(setVideo, videoId);
    } else {
      setVideo(location.video);
    }
  }, [videoId, location.video]);

  if (video == null) {
    return <div>Loading...</div>;
  }

  if (!video.title || !video.videoId || !video.description) {
    throw new Error('video details are required (videoId, title, description)');
  }

  return (
    <Grid container>
      <Grid item md={8}>
        <iframe
          width="100%"
          data-testid="youtube-iframe"
          height="500px"
          src={`https://www.youtube.com/embed/${video.videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </Grid>
      <Grid item md={4}>
        holi
      </Grid>
    </Grid>
  );
}
