import React from 'react'
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const StyledRelatedCard = styled.div`
cursor: pointer;
`;

const StyledImd = styled.img`
width: 100%;
`;

export default function RelatedCard({ video }) {
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