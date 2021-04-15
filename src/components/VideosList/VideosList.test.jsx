import React from 'react';
import { render, screen } from '@testing-library/react';
import VideosList from './VideosList.component';
import data from '../../mocks/youtube-videos-mock.json';

describe('VideosList', () => {
  it('renders message when there are no videos', () => {
    render(<VideosList videos={[]} />);
    const textElement = screen.getByText(/No videos found/i);
    expect(textElement).toBeInTheDocument();
  });

  it('renders videos list', () => {
    render(<VideosList videos={data.items} />);
    const renderedVideos = screen.getAllByTestId('video-title');
    expect(renderedVideos.length).toBe(25);
  });
});
