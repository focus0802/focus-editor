import React from 'react';

const Audio = (props) => {
  return (
    <audio src={props.src} controls>
      <track kind="captions" />
    </audio>
  );
};
export default Audio;
