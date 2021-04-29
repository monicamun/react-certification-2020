import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import VideoDetails from './VideoDetails.component';
import { GlobalContextProvider } from '../../providers/GlobalContext/GlobalContext';

describe('VideoDetails component', () => {
  const getVideosFn = jest.fn();
  const loadVideoFn = jest.fn();

  it('Should throw error if video details are missing', () => {
    const history = createMemoryHistory();
    history.push({ pathname: '/:id', video: {} });
    const renderVideoDetails = () =>
      render(
        <GlobalContextProvider>
          <Router history={history}>
            <VideoDetails getVideosFn={getVideosFn} loadVideoFn={loadVideoFn} />
          </Router>
        </GlobalContextProvider>
      );
    expect(renderVideoDetails).toThrowError(
      'video details are required (videoId, title, description)'
    );
  });

  const video = {
    videoId: 'TNhaISOUy6Q',
    title: '10 React Hooks Explained // Plus Build your own from Scratch',
    description:
      'React hooks provide a highly-efficient was to tap into framework features and organize reactive logic. Learn how use every built-in React hook https://fireship.io/courses/react-nex...',
  };

  // set up common state and render of following tests
  const history = createMemoryHistory();
  history.push({ pathname: '/:id', video });

  it('Should render video title', () => {
    render(
      <GlobalContextProvider>
        <Router history={history}>
          <VideoDetails getVideosFn={getVideosFn} loadVideoFn={loadVideoFn} />
        </Router>
      </GlobalContextProvider>
    );
    const videoTitle = screen.getByText(
      /10 React Hooks Explained \/\/ Plus Build your own from Scratch/i
    );
    expect(videoTitle).toBeInTheDocument();
  });

  it('Should render video description', () => {
    render(
      <GlobalContextProvider>
        <Router history={history}>
          <VideoDetails getVideosFn={getVideosFn} loadVideoFn={loadVideoFn} />
        </Router>
      </GlobalContextProvider>
    );
    const videoDescription = screen.getByText(/React hooks provide a highly-efficient/i);
    expect(videoDescription).toBeInTheDocument();
  });

  it('should render youtube iframe with expected videoId', () => {
    render(
      <GlobalContextProvider>
        <Router history={history}>
          <VideoDetails getVideosFn={getVideosFn} loadVideoFn={loadVideoFn} />
        </Router>
      </GlobalContextProvider>
    );

    const iframe = screen.getByTestId(/youtube-iframe/i);

    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/TNhaISOUy6Q');
  });
});
