import React from 'react';

const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  switch (entity.getType()) {
    case 'audio':
      return (
        <audio controls src={src}>
          <track kind="captions" />
        </audio>
      );
    default:
      return null;
  }
};
export default Media;
