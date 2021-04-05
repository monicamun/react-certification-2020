import { Grid } from '@material-ui/core';
import React from 'react';
import { StyledCard, StyledImage, StyledImg, StyledCardText, StyleCardTitle, StyleCardDesc } from './styled'


export default function Card({ video }) {
  if (video == null) {
    throw new Error('video prop is required');
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <StyledCard>
        <StyledImage>
          <StyledImg src={video.imageUrl} alt={video.title} />
        </StyledImage>
        <StyledCardText>
          <StyleCardTitle>
            <span data-testid="video-title">{video.title}</span>
          </StyleCardTitle>
          <StyleCardDesc>{video.description}</StyleCardDesc>
        </StyledCardText>
      </StyledCard>
    </Grid>
  );
}
