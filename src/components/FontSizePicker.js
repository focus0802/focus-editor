import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, RichUtils } from 'draft-js';
import { Select } from 'antd';

const FontSizePicker = (props) => {
  let current;
  props.fontSizes.forEach((item) => {
    if (props.editorState.getCurrentInlineStyle().has(`fontSize_${item.value}`)) {
      current = item.value;
    }
  });
  return (<div className="focus-editor-controls-container">
    <Select
      placeholder="字体大小"
      style={{ width: 80, margin: '0 4px' }}
      optionLabelProp="value"
      value={current}
      onChange={(value) => {
        const selection = props.editorState.getSelection();
        if (!selection.isCollapsed()) {
          props.onChange(
            RichUtils.toggleInlineStyle(props.editorState, `fontSize_${value}`),
          );
        }
      }}
    >
      {props.fontSizes.map((item) => {
        return <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>;
      })}
    </Select>
  </div>);
};
FontSizePicker.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onChange: PropTypes.func.isRequired,
  fontSizes: PropTypes.array.isRequired,
};
export default FontSizePicker;
