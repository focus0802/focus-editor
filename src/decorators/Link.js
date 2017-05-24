import React from 'react';
import { Tooltip } from 'antd';

const Link = (props) => {
  const { href, target } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <Tooltip overlay={href}>
      <a href={href} target={target}>
        {props.children}
      </a>
    </Tooltip>
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
