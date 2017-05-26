import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';

const Image = (props) => {
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
        <a
          style={{
            color: '#fff',
            marginRight: 8,
          }}
          onClick={props.onEdit}
        >修改</a>
        <a
          style={{
            color: '#fff',
          }}
          onClick={props.onRemove}
        >删除</a>
      </div>}
    >
      <img src={props.src} alt={props.alt} style={props.style} />
    </Tooltip>
  );
};
Image.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
Image.defaultProps = {
  onSelect: () => {
  },
  onEdit: () => {
  },
  onRemove: () => {
  },
};
export default Image;
