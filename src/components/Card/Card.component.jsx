import React from 'react';
import styled from "styled-components";
import { Grid } from '@material-ui/core';

export default function Card(props) {
    const StyledCard = styled.div`
    display: inline-block;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
    margin: 20px;
    position: relative;
    margin-bottom: 50px;
    transition: all 0.2s ease-in-out;
    border-radius: 5px;
  
    &:hover {
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
      margin-bottom: 54px;
    }
  `;
  
  const StyledImage = styled.div`
    opacity: 0.7;
    overflow: hidden;
    transition: all 0.2s ease-in-out;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    max-width:367px;
    max-height: 206px;
  
    &:hover {
      opacity: 1;
    }
  `;

  const StyledImg = styled.img`
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
  border-radius: inherit;
  `
  
  const StyleCardTitle = styled.h3``;
  const StyleCardDesc = styled.p`
    margin-bottom: 0px;
  `;
  const StyledCardText = styled.div`
    background: #fff;
    padding: 20px;
    min-height: 200px;
    border-radius: inherit;
  `;
  

  return (
    <Grid item xs={12} sm={6} md={4}>
      <StyledCard>
        <StyledImage>
          <StyledImg
            src={props.imageUrl}
            alt={props.title}
          />
        </StyledImage>
        <StyledCardText>
          <StyleCardTitle>{props.title}</StyleCardTitle>
          <StyleCardDesc>{props.body}</StyleCardDesc>
        </StyledCardText>
      </StyledCard>
    </Grid>
  );
}
