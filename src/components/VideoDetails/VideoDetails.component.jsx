import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { getVideos, loadVideo } from '../../services/videoService';
import { useGlobal } from '../../providers/GlobalContext/GlobalContext';
import RelatedCard from './RelatedCard';

export default function VideoDetails({
  loadVideoFn = loadVideo,
  getVideosFn = getVideos,
}) {
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState([]);
  const location = useLocation();
  const { videoId } = useParams();
  const globalContext = useGlobal();
  const isFavorite = globalContext.favorites.some((f) => f.videoId === videoId);

  const getFavoritesButton = () => {
    if (!globalContext.user) {
      return;
    }

    if (isFavorite) {
      return (
        <Button
          onClick={() =>
            globalContext.favoritesDispatch({ type: 'remove', payload: videoId })
          }
        >
          Quitar de favoritos
        </Button>
      );
    }
    return (
      <Button
        onClick={() => globalContext.favoritesDispatch({ type: 'add', payload: video })}
      >
        Agregar a favoritos
      </Button>
    );
  };

  useEffect(() => {
    if (typeof location.video === 'undefined' || location.video === null) {
      loadVideoFn(setVideo, videoId);
    } else {
      setVideo(location.video);
    }
  }, [videoId, location.video, loadVideoFn]);

  useEffect(() => {
    if (location.pathname.startsWith('/favorites')) {
      setRelatedVideos(globalContext.favorites);
    } else {
      getVideosFn(setRelatedVideos, globalContext.searchState);
    }
  }, [
    globalContext.searchState,
    getVideosFn,
    location.pathname,
    globalContext.favorites,
  ]);

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
        <Grid container justify="space-between">
          <Grid item md={8}>
            <h3 style={{ margin: 0 }}>{video.title}</h3>
          </Grid>
          <Grid item md={3}>
            {getFavoritesButton()}
          </Grid>
        </Grid>

        <p>{video.description}</p>
      </Grid>
      <Grid item md={4}>
        {relatedVideos.map((v) => (
          <RelatedCard key={v.videoId} video={v} />
        ))}
      </Grid>
    </Grid>
  );
}
