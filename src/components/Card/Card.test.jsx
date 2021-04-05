import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card.component';

describe('Card component', () => {
  it('Should throw error if no video is passed', () => {
    const renderCard = () => render(<Card />);
    expect(renderCard).toThrowError('video prop is required');
  });

  it('Should render video title', () =>{
      const video = {
          title : 'video title',
          description: 'some video description'
      }
      render(<Card video={video}/>)
      const cardTitle = screen.getByText(/video title/i);
      expect(cardTitle).toBeInTheDocument();
  })

  it('Should render video description', () => {
      const video = {
          description: 'some video description'
      }
      render(<Card video={video} />)
      const cardDescription = screen.getByText(/some video description/i);
      expect(cardDescription).toBeInTheDocument();
  })
  
  it ('Should render video image', () => {
      const video = {
          title: 'video title',
          imageUrl:'https://i.ytimg.com/vi/nmXMgqjQzls/default.jpg'
      }
      render(<Card video={video}/>)
      const cardImage = screen.getByAltText('video title')
      expect(cardImage.src).toContain('https://i.ytimg.com/vi/nmXMgqjQzls/default.jpg');
  })
});
