import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import ToolbarButton from './ToolbarButton';
import InsertAudio from './media/InsertAudio';

const MediaControls = (props) => {
  return (<div className="focus-editor-controls-container">
    <InsertAudio
      editorState={props.editorState}
      onChange={props.onChange}
      onUpload={props.onAudioUpload}
    />
    <ToolbarButton
      label={<i className="fa fa-image" />}
      onClick={() => {
        console.log(props.editorState, props.onChange);
      }}
      tooltip="插入图片"
    />
    <ToolbarButton
      label={<i className="fa fa-video-camera" />}
      onClick={() => {
      }}
      tooltip="插入视频"
    />
  </div>);
};
MediaControls.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onChange: PropTypes.func.isRequired,
  onAudioUpload: PropTypes.func,
};
MediaControls.defaultProps = {
  onAudioUpload: () => {
  },
};
export default MediaControls;
