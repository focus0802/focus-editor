import React from 'react';
import Audio from './Audio';
import Image from './Image';
import Video from './Video';
import Flash from './Flash';

const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  switch (entity.getType()) {
    case 'audio':
      return <Audio {...entity.getData()} />;
    case 'image':
      return <Image {...entity.getData()} />;
    case 'video':
      return <Video {...entity.getData()} />;
    case 'flash':
      return <Flash {...entity.getData()} />;
    default:
      return null;
  }
};
export default Media;
