import React from 'react';
import { Tooltip } from 'antd';

const Video = (props) => {
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
      <video
        style={props.style}
        src={props.src}
        controls
        autoPlay={!!props.autoPlay}
      >
        <track kind="captions" />
      </video>
    </Tooltip>
  );
};
export default Video;
