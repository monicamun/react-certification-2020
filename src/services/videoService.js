const apikey = 'AIzaSyCF1UyI7423EPCH43sA-nrVaGoUcuppENA';

export async function fetchVideos(keyword) {
  const url = new URL('https://youtube.googleapis.com/youtube/v3/search');
  const params = {
    part: 'snippet',
    maxResults: 25,
    q: keyword,
    key: apikey,
  };

  url.search = new URLSearchParams(params).toString();
  const response = await fetch(url);
  const jsonResponse = await response.json();
  const videos = jsonResponse.items
    .map((video) => {
      return {
        videoId: video.id.videoId,
        title: video.snippet.title,
        imageUrl: video.snippet.thumbnails.medium.url,
        description: video.snippet.description,
      };
    })
    .filter((video) => video.videoId);
  return videos;
}

export async function fetchVideo(videoId) {
  const url = new URL('https://youtube.googleapis.com/youtube/v3/videos');
  const params = {
    part: 'snippet,contentDetails,statistics',
    id: videoId,
    key: apikey,
  };
  url.search = new URLSearchParams(params).toString();
  const response = await fetch(url);
  const jsonResponse = await response.json();

  const videos = jsonResponse.items
    .map((video) => {
      return {
        videoId: video.id,
        title: video.snippet.title,
        imageUrl: video.snippet.thumbnails.medium.url,
        description: video.snippet.description,
      };
    })
    .filter((video) => video.videoId);

  const video = videos[0];
  return video;
}
