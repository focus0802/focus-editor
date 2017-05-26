import React from 'react';
import { Tooltip } from 'antd';

const Audio = (props) => {
  return (
    <Tooltip
      placement="topLeft"
      overlay={<div>
        <a
          style={{
            color: '#fff',
            marginRight: 8,
          }}
          onClick={props.onSelect}
        >选择</a>
        <a onClick={props.onEdit} style={{ color: '#fff', marginRight: 8 }}>修改</a>
        <a onClick={props.onRemove} style={{ color: '#fff' }}>删除</a>
      </div>}
    >
      <audio src={props.src} controls>
        <track kind="captions" />
      </audio>
    </Tooltip>
  );
};
export default Audio;
