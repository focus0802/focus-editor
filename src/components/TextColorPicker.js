import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier, RichUtils } from 'draft-js';
import ToolbarButton from './ToolbarButton';
import ColorPicker from './color-picker/ColorPicker';

class TextColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerVisible: false,
    };
    this.event = () => {
      this.setState({
        pickerVisible: false,
      });
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.event);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.event);
  }

  render() {
    return (<div className="focus-editor-controls-container">
      <ToolbarButton
        label={<i className="fa fa-font" />}
        tooltip="文字颜色"
        onClick={(e) => {
          e.nativeEvent.stopImmediatePropagation();
          this.setState({ pickerVisible: !this.state.pickerVisible });
        }}
      />
      <div
        onClick={(e) => {
          e.nativeEvent.stopImmediatePropagation();
        }}
      >
        <ColorPicker
          colors={this.props.colors}
          visible={this.state.pickerVisible}
          onChange={(value) => {
            const { editorState } = this.props;
            const selection = editorState.getSelection();
            const currentStyle = editorState.getCurrentInlineStyle();
            const nextContentState = currentStyle.reduce((contentState, style) => {
              if (style.startsWith('color_')) {
                return Modifier.removeInlineStyle(contentState, selection, style);
              } else {
                return contentState;
              }
            }, editorState.getCurrentContent());
            let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style');
            if (selection.isCollapsed()) {
              nextEditorState = currentStyle.reduce((state, color) => {
                return RichUtils.toggleInlineStyle(state, color);
              }, nextEditorState);
            }
            if (value && !currentStyle.has(`color_${value}`)) {
              nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, `color_${value}`);
            }
            this.props.onChange(nextEditorState);
            this.setState({ pickerVisible: false });
          }}
        />
      </div>
    </div>);
  }
}
TextColorPicker.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onChange: PropTypes.func.isRequired,
  colors: PropTypes.array.isRequired,
};
export default TextColorPicker;
