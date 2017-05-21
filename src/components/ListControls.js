import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, RichUtils } from 'draft-js';
import ToolbarButton from './ToolbarButton';

const ListControls = (props) => {
  const type = props.editorState.getCurrentContent().getBlockForKey(
    props.editorState.getSelection().getFocusKey()).getType();
  return (<div className="focus-editor-controls-container">
    <ToolbarButton
      label={<i className="fa fa-list-ul" />}
      onClick={() => {
        props.onChange(
          RichUtils.toggleBlockType(props.editorState, 'unordered-list-item'),
        );
      }}
      tooltip="无序列表"
      active={type === 'unordered-list-item'}
    />
    <ToolbarButton
      label={<i className="fa fa-list-ol" />}
      onClick={() => {
        props.onChange(
          RichUtils.toggleBlockType(props.editorState, 'ordered-list-item'),
        );
      }}
      tooltip="有序列表"
      active={type === 'ordered-list-item'}
    />
  </div>);
};
ListControls.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onChange: PropTypes.func.isRequired,
};
export default ListControls;
