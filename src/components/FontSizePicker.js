import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, RichUtils, Modifier } from 'draft-js';
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
      allowClear
      onChange={(value) => {
        const { editorState } = props;
        const selection = editorState.getSelection();
        const nextContentState = props.fontSizes.reduce((contentState, fontSize) => {
          return Modifier.removeInlineStyle(contentState, selection, `fontSize_${fontSize.value}`);
        }, editorState.getCurrentContent());
        let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style');
        const currentStyle = editorState.getCurrentInlineStyle();
        if (selection.isCollapsed()) {
          nextEditorState = currentStyle.reduce((state, fontSize) => {
            return RichUtils.toggleInlineStyle(state, `fontSize_${fontSize}`);
          }, nextEditorState);
        }
        if (value && !currentStyle.has(`fontSize_${value}`)) {
          nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, `fontSize_${value}`);
        }
        props.onChange(nextEditorState);
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
