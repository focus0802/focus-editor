import React from 'react';

const Link = (props) => {
  const { href } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={href}>
      {props.children}
    </a>
  );
};
export default Link;
export function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback,
  );
}
