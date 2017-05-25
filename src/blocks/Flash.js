import React from 'react';
import { Tooltip } from 'antd';

const Flash = (props) => {
  return (
    <Tooltip
      placement="topLeft"
      overlay={<div>
        <a onClick={props.onEdit} style={{ color: '#fff', marginRight: 8 }}>修改</a>
        <a onClick={props.onRemove} style={{ color: '#fff' }}>删除</a>
      </div>}
    >
      <embed
        type="application/x-shockwave-flash"
        src={props.src}
        style={props.style}
      />
    </Tooltip>
  );
};
export default Flash;
