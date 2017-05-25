import React from 'react';
import Audio from './Audio';
import Image from './Image';
import Video from './Video';
import Flash from './Flash';

const Media = (props) => {
  const entityKey = props.block.getEntityAt(0);
  if (entityKey) {
    const entity = props.contentState.getEntity(entityKey);
    switch (entity.getType()) {
      case 'AUDIO':
        return (<Audio
          {...entity.getData()}
          onRemove={() => {
            props.blockProps.onRemove(props.block.key);
          }}
          onEdit={() => {
            props.blockProps.onAudioEdit(props.block.key);
          }}
        />);
      case 'IMAGE':
        return (<Image
          {...entity.getData()}
          onRemove={() => {
            props.blockProps.onRemove(props.block.key);
          }}
          onEdit={() => {
            props.blockProps.onImageEdit(props.block.key);
          }}
        />);
      case 'VIDEO':
        return (<Video
          {...entity.getData()}
          onRemove={() => {
            props.blockProps.onRemove(props.block.key);
          }}
          onEdit={() => {
            props.blockProps.onVideoEdit(props.block.key);
          }}
        />);
      case 'FLASH':
        return (<Flash
          {...entity.getData()}
          onRemove={() => {
            props.blockProps.onRemove(props.block.key);
          }}
          onEdit={() => {
            props.blockProps.onFlashEdit(props.block.key);
          }}
        />);
      default:
        return <div />;
    }
  } else {
    return <div />;
  }
};
export default Media;
