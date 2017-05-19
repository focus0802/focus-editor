import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import ToolbarButton from './ToolbarButton';

const HistoryControls = (props) => {
  return (<div className="focus-editor-controls-container">
    {/* 撤销 */}
    <ToolbarButton
      label={<i className="fa fa-rotate-left" />}
      onClick={() => {
        props.onChange(
          EditorState.undo(props.editorState),
        );
      }}
      tooltip="撤销"
      disabled={!props.editorState.getUndoStack().size}
    />
    {/* 重做 */}
    <ToolbarButton
      label={<i className="fa fa-rotate-right" />}
      onClick={() => {
        props.onChange(
          EditorState.redo(props.editorState),
        );
      }}
      tooltip="重做"
      disabled={!props.editorState.getRedoStack().size}
    />
  </div>);
};
HistoryControls.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onChange: PropTypes.func.isRequired,
};
export default HistoryControls;
