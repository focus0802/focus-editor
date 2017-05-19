import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, RichUtils } from 'draft-js';
import InsertLink from './InsertLink';
import ToolbarButton from './ToolbarButton';

const LinkControls = (props) => {
  return (<div className="focus-editor-controls-container">
    <InsertLink
      editorState={props.editorState}
      onChange={props.onChange}
    />
    <ToolbarButton
      label={<i className="fa fa-unlink" />}
      tooltip="移除链接"
      onClick={() => {
        props.onChange(
          RichUtils.toggleLink(props.editorState, props.editorState.getSelection(), null),
        );
      }}
      disabled={props.editorState.getSelection().isCollapsed()}
    />
  </div>);
};
LinkControls.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onChange: PropTypes.func.isRequired,
};
export default LinkControls;
