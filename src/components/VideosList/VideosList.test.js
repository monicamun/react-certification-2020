import React from 'react';
import { render, screen } from '@testing-library/react';
import VideosList from './VideosList.component';
import data from '../../mocks/youtube-videos-mock.json';

describe('VideosList', () => {
  it('exists', () => {
    render(React.createElement(VideosList, { videos: [] }));
  });

  it('renders message when there are no videos', () => {
    render(React.createElement(VideosList, { videos: [] }));
    const textElement = screen.getByText(/No videos found/i);
    expect(textElement).toBeInTheDocument();
  });

  it('renders videos list', () => {
    const { getAllByTestId } = render(
      React.createElement(VideosList, { videos: data.items })
    );
    setTimeout(() => {
      const renderedTitles = getAllByTestId('video-title').map(
        (card) => card.textContent
      );
      const mockTitles = data.items.map((v) => v.snippet.title);
      expect(renderedTitles).toEqual(mockTitles);
    }, 1000);
  });
});
