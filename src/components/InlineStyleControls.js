import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, RichUtils } from 'draft-js';
import ToolbarButton from './ToolbarButton';

const InlineStyleControls = (props) => {
  const toggleInlineStyle = (inlineStyle) => {
    props.onChange(RichUtils.toggleInlineStyle(
      props.editorState,
      inlineStyle,
    ));
  };
  return (<div className="focus-editor-controls-container">
    {/* 加粗 */}
    <ToolbarButton
      label={<i className="fa fa-bold" />}
      onClick={() => toggleInlineStyle('BOLD')}
      active={props.editorState.getCurrentInlineStyle().has('BOLD')}
      tooltip="粗体"
    />
    {/* 斜体 */}
    <ToolbarButton
      label={<i className="fa fa-italic" />}
      onClick={() => toggleInlineStyle('ITALIC')}
      active={props.editorState.getCurrentInlineStyle().has('ITALIC')}
      tooltip="斜体"
    />
    {/* 下划线 */}
    <ToolbarButton
      label={<i className="fa fa-underline" />}
      onClick={() => toggleInlineStyle('UNDERLINE')}
      active={props.editorState.getCurrentInlineStyle().has('UNDERLINE')}
      tooltip="下划线"
    />
    {/* 删除线 */}
    <ToolbarButton
      label={<i className="fa fa-strikethrough" />}
      onClick={() => toggleInlineStyle('STRIKETHROUGH')}
      active={props.editorState.getCurrentInlineStyle().has('STRIKETHROUGH')}
      tooltip="删除线"
    />
  </div>);
};
InlineStyleControls.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onChange: PropTypes.func.isRequired,
};
export default InlineStyleControls;
