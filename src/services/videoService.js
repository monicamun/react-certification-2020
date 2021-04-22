function initializeYoutubeApi(fn) {
  // initialize gapi
  window.gapi.load('client:auth2', async () => {
    await window.gapi.auth2.init({
      client_id:
        '537606572960-o8ms8f2g27kepgh2fmd14m0bgsmsh6og.apps.googleusercontent.com',
    });
    // to initialize youtube we need to set the api key first
    window.gapi.client.setApiKey('AIzaSyCykzCobNVjS-XeWrXWwPH06nLtq7Assis');
    await window.gapi.client.load(
      'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
    );

    await fn();
  });
}

export function getVideos(setVideos, keyword) {
  initializeYoutubeApi(async () => {
    // after initializing we can make the api call
    // call youtube search
    const response = await window.gapi.client.youtube.search.list({
      part: ['snippet'],
      maxResults: 25,
      q: keyword,
    });

    const videos = response.result.items
      .map((video) => {
        return {
          videoId: video.id.videoId,
          title: video.snippet.title,
          imageUrl: video.snippet.thumbnails.medium.url,
          description: video.snippet.description,
        };
      })
      .filter((video) => video.videoId);

    // use the setVideos function passed by the component to set the videos to the state
    setVideos(videos);
  });
}

export function getRelatedVideos(setRelatedVideos, videoId) {
  initializeYoutubeApi(async () => {
    // call youtube search
    const response = await window.gapi.client.youtube.search.list({
      part: ['snippet'],
      maxResults: 25,
      relatedToVideoId: videoId,
    });

    const videos = response.result.items
      .map((video) => {
        return {
          videoId: video.id.videoId,
          title: video.snippet.title,
          imageUrl: video.snippet.thumbnails.medium.url,
          description: video.snippet.description,
        };
      })
      .filter((video) => video.videoId);

    // use the setVideos function passed by the component to set the videos to the state
    setRelatedVideos(videos);
  });
}

export function loadVideo(setVideo, videoId) {
  initializeYoutubeApi(async () => {
    // call youtube videos list
    const response = await window.gapi.client.youtube.videos.list({
      part: ['snippet,contentDetails,statistics'],
      id: [videoId],
    });

    const videos = response.result.items
      .map((video) => {
        return {
          videoId,
          title: video.snippet.title,
          imageUrl: video.snippet.thumbnails.medium.url,
          description: video.snippet.description,
        };
      })
      .filter((video) => video.videoId);

    const video = videos[0];

    // use the setVideo function passed by the component to set the video to the state
    setVideo(video);
  });
}
