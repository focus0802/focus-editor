import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import InsertAudio from './media/InsertAudio';
import InsertImage from './media/InsertImage';
import InsertVideo from './media/InsertVideo';
import InsertFlash from './media/InsertFlash';

const MediaControls = (props) => {
  return (<div className="focus-editor-controls-container">
    <InsertAudio
      editorState={props.editorState}
      onChange={props.onChange}
      onUpload={props.onAudioUpload}
    />
    <InsertImage
      editorState={props.editorState}
      onChange={props.onChange}
      onUpload={props.onImageUpload}
    />
    <InsertVideo
      editorState={props.editorState}
      onChange={props.onChange}
      onUpload={props.onVideoUpload}
    />
    <InsertFlash
      editorState={props.editorState}
      onChange={props.onChange}
    />
  </div>);
};
MediaControls.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onChange: PropTypes.func.isRequired,
  onAudioUpload: PropTypes.func,
  onImageUpload: PropTypes.func,
  onVideoUpload: PropTypes.func,
};
MediaControls.defaultProps = {
  onAudioUpload: () => {
  },
  onImageUpload: () => {
  },
  onVideoUpload: () => {
  },
};
export default MediaControls;
