import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import VideosList from './VideosList.component';
import data from '../../mocks/youtube-videos-mock.json';

describe('VideosList', () => {
  it('renders message when there are no videos', () => {
    render(<VideosList videos={[]} />);
    const textElement = screen.getByText(/No videos found/i);
    expect(textElement).toBeInTheDocument();
  });

  it('renders videos list', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <VideosList videos={data.items} />
      </Router>
    );
    const renderedVideos = screen.getAllByTestId('video-title');
    expect(renderedVideos.length).toBe(25);
  });
});
