export function getVideos(setVideos) {
  // initialize gapi
  window.gapi.load('client:auth2', async function () {
    await window.gapi.auth2.init({
      client_id:
        '537606572960-o8ms8f2g27kepgh2fmd14m0bgsmsh6og.apps.googleusercontent.com',
    });
    // to initialize youtube we need to set the api key first
    window.gapi.client.setApiKey('AIzaSyCykzCobNVjS-XeWrXWwPH06nLtq7Assis');
    await window.gapi.client.load(
      'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'
    );

    // after initializing we can make the api call
    // call youtube search
    const response = await window.gapi.client.youtube.search.list({
      part: ['snippet'],
      maxResults: 25,
      q: 'surfing',
    });

    const videos = response.result.items
      .map((video) => {
        return {
          etag: video.etag,
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
