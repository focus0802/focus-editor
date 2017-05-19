import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js';
import ToolbarButton from './ToolbarButton';

const AlignmentControls = (props) => {
  const toggleAlignment = (alignment) => {
    props.onChange(EditorState.push(
      props.editorState,
      Modifier.setBlockData(
        props.editorState.getCurrentContent(),
        props.editorState.getSelection(),
        { alignment }),
      'change-block-data',
    ));
  };
  return (<div className="focus-editor-controls-container">
    {/* 居左对齐 */}
    <ToolbarButton
      label={<i className="fa fa-align-left" />}
      onClick={() => toggleAlignment('left')}
      active={props.editorState.getCurrentContent().getFirstBlock().getData().get('alignment') === 'left'}
      tooltip="居左对齐"
    />
    {/* 居中对齐 */}
    <ToolbarButton
      label={<i className="fa fa-align-center" />}
      onClick={() => toggleAlignment('center')}
      active={props.editorState.getCurrentContent().getFirstBlock().getData().get('alignment') === 'center'}
      tooltip="居中对齐"
    />
    {/* 居右对齐 */}
    <ToolbarButton
      label={<i className="fa fa-align-right" />}
      onClick={() => toggleAlignment('right')}
      active={props.editorState.getCurrentContent().getFirstBlock().getData().get('alignment') === 'right'}
      tooltip="居右对齐"
    />
    {/* 两端对齐 */}
    <ToolbarButton
      label={<i className="fa fa-align-justify" />}
      onClick={() => toggleAlignment('justify')}
      active={props.editorState.getCurrentContent().getFirstBlock().getData().get('alignment') === 'justify'}
      tooltip="两端对齐"
    />
  </div>);
};
AlignmentControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default AlignmentControls;
