import React from 'react';
import PropTypes from 'prop-types';
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
    this.styleMap = {
      STRIKETHROUGH: {
        textDecoration: 'line-through',
      },
    };
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
    return (<div className="focus-editor">
      <div className="focus-editor-toolbar">
        <HistoryControls
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
        <HeadingPicker
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
        <InlineStyleControls
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
        />
      </div>
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
};
FocusEditor.defaultProps = {
  onAudioUpload: () => {
  },
};
export default FocusEditor;
