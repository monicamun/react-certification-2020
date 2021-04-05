import data from '../mocks/youtube-videos-mock.json';

export async function getVideos() {
  return data.items.map((video) => {
    return {
      etag: video.etag,
      title: video.snippet.title,
      imageUrl: video.snippet.thumbnails.medium.url,
      description: video.snippet.description,
    };
  });
}
