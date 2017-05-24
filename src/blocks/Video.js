import React from 'react';
import { Tooltip } from 'antd';

const Video = (props) => {
  return (
    <Tooltip
      placement="topLeft"
      overlay={<div>
        <a onClick={props.onEdit} style={{ color: '#fff', marginRight: 8 }}>修改</a>
        <a onClick={props.onRemove} style={{ color: '#fff' }}>删除</a>
      </div>}
    >
      <video
        width={props.width}
        height={props.height}
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
