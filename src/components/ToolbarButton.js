import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';
import { Tooltip } from 'antd';

const ToolbarButton = (props) => {
  const content = (<div
    className={classNames(
      'focus-editor-toolbar-button',
      { 'focus-editor-toolbar-button-disabled': props.disabled },
      { 'focus-editor-toolbar-button-active': props.active },
    )}
    onClick={props.onClick}
  >
    {props.label}
  </div>);
  return props.tooltip ? <Tooltip placement="top" overlay={props.tooltip}>{content}</Tooltip> : content;
};
ToolbarButton.propTypes = {
  label: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  tooltip: PropTypes.string,
};
ToolbarButton.defaultProps = {
  disabled: false,
  active: false,
  tooltip: undefined,
};
export default ToolbarButton;
