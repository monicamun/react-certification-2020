export function getVideos(setVideos) {
  window.gapi.load('client:auth2', function () {
    window.gapi.auth2
      .init({
        client_id:
          '537606572960-o8ms8f2g27kepgh2fmd14m0bgsmsh6og.apps.googleusercontent.com',
      })
      .then(() => {
        window.gapi.client.setApiKey('AIzaSyCykzCobNVjS-XeWrXWwPH06nLtq7Assis');
        window.gapi.client
          .load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
          .then(() => {
            window.gapi.client.youtube.search
              .list({
                part: ['snippet'],
                maxResults: 25,
                q: 'surfing',
              })
              .then((response) => {
                setVideos(
                  response.result.items.map((video) => {
                    return {
                      etag: video.etag,
                      title: video.snippet.title,
                      imageUrl: video.snippet.thumbnails.medium.url,
                      description: video.snippet.description,
                    };
                  })
                );
              });
          });
      });
  });
}
