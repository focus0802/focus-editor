import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, RichUtils } from 'draft-js';
import ToolbarButton from './ToolbarButton';

const ListControls = (props) => {
  return (<div className="focus-editor-controls-container">
    <ToolbarButton
      label={<i className="fa fa-list-ul" />}
      onClick={() => {
        props.onChange(
          RichUtils.toggleBlockType(props.editorState, 'unordered-list-item'),
        );
      }}
      tooltip="无序列表"
      active={props.editorState.getCurrentContent().getFirstBlock().getType() === 'unordered-list-item'}
    />
    <ToolbarButton
      label={<i className="fa fa-list-ol" />}
      onClick={() => {
        props.onChange(
          RichUtils.toggleBlockType(props.editorState, 'ordered-list-item'),
        );
      }}
      tooltip="有序列表"
      active={props.editorState.getCurrentContent().getFirstBlock().getType() === 'ordered-list-item'}
    />
  </div>);
};
ListControls.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onChange: PropTypes.func.isRequired,
};
export default ListControls;
