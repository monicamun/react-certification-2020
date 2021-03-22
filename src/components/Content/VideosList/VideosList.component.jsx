import React from 'react';
import MediaCard from '../MediaCard/MediaCard.component';

export default function VideosList(props) {
  if (!props.videos) {
    return 'Loading...';
  } else if (props.videos.length === 0) {
    return <div>No videos found</div>;
  } else {
    return (
      <>
        {props.videos.map((video) => (
          <MediaCard
            key={video.etag}
            title={video.title}
            imageUrl={video.imageUrl}
            body={video.description}
          />
        ))}
      </>
    );
  }
}
