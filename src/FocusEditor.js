import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';
import { Affix } from 'antd';
import { Editor, EditorState, CompositeDecorator } from 'draft-js';
import 'font-awesome/css/font-awesome.min.css';
import './focus-editor.css';
import InlineStyleControls from './components/InlineStyleControls';
import AlignmentControls from './components/AlignmentControls';
import HistoryControls from './components/HistoryControls';
import HeadingPicker from './components/HeadingPicker';
import ListControls from './components/ListControls';
import MediaControls from './components/MediaControls';
import Link, { findLinkEntities } from './decorators/Link';
import LinkControls from './components/LinkControls';
import Media from './blocks/Media';
import ToolbarButton from './components/ToolbarButton';
import FontSizePicker from './components/FontSizePicker';
import TextColorPicker from './components/TextColorPicker';

class FocusEditor extends React.Component {
  constructor(props) {
    super(props);
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ]);
    this.state = {
      editorState: EditorState.createEmpty(decorator),
    };
    this.onChange = editorState => this.setState({ editorState });
    this.fontSizes = [
      {
        label: <span style={{ fontSize: 12 }}>12px</span>,
        value: '12px',
      },
      {
        label: <span style={{ fontSize: 14 }}>14px</span>,
        value: '14px',
      },
      {
        label: <span style={{ fontSize: 16 }}>16px</span>,
        value: '16px',
      },
      {
        label: <span style={{ fontSize: 18 }}>18px</span>,
        value: '18px',
      },
      {
        label: <span style={{ fontSize: 20 }}>20px</span>,
        value: '20px',
      },
      {
        label: <span style={{ fontSize: 22 }}>22px</span>,
        value: '22px',
      },
      {
        label: <span style={{ fontSize: 24 }}>24px</span>,
        value: '24px',
      },
      {
        label: <span style={{ fontSize: 28 }}>28px</span>,
        value: '28px',
      },
      {
        label: <span style={{ fontSize: 32 }}>32px</span>,
        value: '32px',
      },
    ];
    this.styleMap = {
      STRIKETHROUGH: {
        textDecoration: 'line-through',
      },
    };
    this.fontSizes.forEach((item) => {
      this.styleMap[`fontSize_${item.value}`] = { fontSize: item.value };
    });
    this.blockStyleFn = (contentBlock) => {
      const data = contentBlock.getData();
      if (data.has('alignment')) {
        return `align-${data.get('alignment')}`;
      }
    };
    this.blockRendererFn = (contentBlock) => {
      if (contentBlock.getType() === 'atomic') {
        return {
          component: Media,
          editable: false,
        };
      }
      return null;
    };
  }

  render() {
    return (<div
      className={classNames(
        'focus-editor',
        { 'focus-editor-fullscreen': this.state.fullScreen },
      )}
    >
      <Affix>
        <div className="focus-editor-toolbar">
          <div className="focus-editor-controls-container">
            <ToolbarButton
              label={<i className="fa fa-arrows-alt" />}
              tooltip="全屏"
              onClick={() => {
                this.setState({ fullScreen: !this.state.fullScreen });
              }}
              active={this.state.fullScreen}
            />
          </div>
          <HistoryControls
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
          <HeadingPicker
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
          <FontSizePicker
            editorState={this.state.editorState}
            onChange={this.onChange}
            fontSizes={this.fontSizes}
          />
          <InlineStyleControls
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
          <TextColorPicker
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
          <AlignmentControls
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
          <ListControls
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
          <LinkControls
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
          <MediaControls
            editorState={this.state.editorState}
            onChange={this.onChange}
            onAudioUpload={this.props.onAudioUpload}
            onImageUpload={this.props.onImageUpload}
            onVideoUpload={this.props.onVideoUpload}
          />
        </div>
      </Affix>
      <div className="focus-editor-container">
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          customStyleMap={this.styleMap}
          blockStyleFn={this.blockStyleFn}
          blockRendererFn={this.blockRendererFn}
        />
      </div>
    </div>);
  }
}
FocusEditor.propTypes = {
  onAudioUpload: PropTypes.func,
  onImageUpload: PropTypes.func,
  onVideoUpload: PropTypes.func,
};
FocusEditor.defaultProps = {
  onAudioUpload: () => {
  },
  onImageUpload: () => {
  },
  onVideoUpload: () => {
  },
};
export default FocusEditor;
