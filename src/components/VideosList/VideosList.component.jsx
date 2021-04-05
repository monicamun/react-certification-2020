import React from 'react';
import Card from '../Card/Card.component';

export default function VideosList(props) {
  if (!props.videos) {
    return 'Loading...';
  }
  if (props.videos.length === 0) {
    return <div>No videos found</div>;
  }
  return (
    <>
      {props.videos.map((video) => (
        <Card
          key={video.etag}
          video={video}
        />
      ))}
    </>
  );
}
