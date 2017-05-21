import React from 'react';
import ToolbarButton from './ToolbarButton';
import ColorPicker from './color-picker/ColorPicker';

const TextColorPicker = (props) => {
  return (<div className="focus-editor-controls-container">
    <ToolbarButton
      label={<i className="fa fa-font" />}
      tooltip="文字颜色"
      onClick={() => {
        console.log(props);
      }}
    />
    <ColorPicker
      visible
    />
  </div>);
};
export default TextColorPicker;
