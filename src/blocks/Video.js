import React from 'react';

const Video = (props) => {
  return (
    <video src={props.src} controls autoPlay={!!props.autoPlay}>
      <track kind="captions" />
    </video>
  );
};
export default Video;
