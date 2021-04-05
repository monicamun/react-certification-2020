import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { getVideos, loadVideo } from '../../services/videoService';
import SearchContext from '../../providers/SearchContext';

const StyledRelatedCard = styled.div`
  cursor: pointer;
`;

const StyledImd = styled.img`
  width: 100%;
`;

function RelatedCard({ video }) {
  const history = useHistory();
  return (
    <StyledRelatedCard
      onClick={() => history.push({ pathname: `/${video.videoId}`, video })}
    >
      <Grid container>
        <Grid item xs={4}>
          <StyledImd src={video.imageUrl} alt={video.title} />
        </Grid>
        <Grid item xs={8}>
          {video.title}
        </Grid>
      </Grid>
    </StyledRelatedCard>
  );
}

export default function VideoDetails() {
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState([]);
  const location = useLocation();
  const { videoId } = useParams();
  const searchContext = useContext(SearchContext);

  useEffect(() => {
    if (location.video === undefined || location.video === null) {
      loadVideo(setVideo, videoId);
    } else {
      setVideo(location.video);
    }
  }, [videoId, location.video]);

  useEffect(() => {
    getVideos(setRelatedVideos, searchContext.searchText);
  }, [searchContext.searchText]);

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
        {relatedVideos.map((v) => (
          <RelatedCard key={v.videoId} video={v} />
        ))}
      </Grid>
    </Grid>
  );
}
