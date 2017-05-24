import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';
import { Affix } from 'antd';
import { Editor, EditorState, SelectionState, Modifier, CompositeDecorator } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import 'font-awesome/css/font-awesome.min.css';
import './focus-editor.css';
import InlineStyleControls from './components/InlineStyleControls';
import AlignmentControls from './components/AlignmentControls';
import HistoryControls from './components/HistoryControls';
import HeadingPicker from './components/HeadingPicker';
import ListControls from './components/ListControls';
import Link, { findLinkEntities } from './decorators/Link';
import LinkControls from './components/LinkControls';
import Media from './blocks/Media';
import ToolbarButton from './components/ToolbarButton';
import FontSizePicker from './components/FontSizePicker';
import TextColorPicker from './components/TextColorPicker';
import BackgroundColorPicker from './components/BackgroundColorPicker';
import InsertImage from './components/media/InsertImage';
import InsertAudio from './components/media/InsertAudio';
import InsertVideo from './components/media/InsertVideo';
import InsertFlash from './components/media/InsertFlash';

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
    this.colors = [
      '#880a38', '#a31837', '#bd2636', '#d73435', '#f04134', '#f46e65', '#f79992', '#fabeb9',
      '#004c32', '#00643b', '#007b43', '#00924c', '#00a854', '#3dbd7d', '#76d0a3', '#a7e1c4',
      '#073069', '#09488a', '#0c60aa', '#0e77ca', '#108ee9', '#49a9ee', '#7ec2f3', '#add8f7',
      '#8c0776', '#a71278', '#c11c7b', '#dc277d', '#f5317f', '#f7629e', '#fa90ba', '#fcb8d3',
      '#7a0000', '#991b00', '#b93600', '#d75000', '#f56a00', '#f78e3d', '#faaf76', '#fccca7',
      '#321580', '#42299a', '#533eb4', '#6252cd', '#7265e6', '#948aec', '#b3acf2', '#cfcaf6',
      '#802800', '#a04f00', '#c17500', '#e09a00', '#ffbf00', '#ffce3d', '#ffdd76', '#ffe9a7',
      '#003c4e', '#005667', '#00707f', '#008997', '#00a2ae', '#3db8c1', '#76cdd3', '#a7dfe3',
      '#222222', '#404040', '#5a5a5a', '#919191', '#bfbfbf', '#d9d9d9', '#e9e9e9', '#f5f5f5',
    ];
    const inlineStyles = {
      BOLD: { element: 'b' },
      ITALIC: { element: 'i' },
    };
    this.fontSizes.forEach((item) => {
      inlineStyles[`fontSize_${item.value}`] = {
        style: {
          fontSize: item.value,
        },
      };
    });
    this.colors.forEach((item) => {
      inlineStyles[`color_${item}`] = {
        style: {
          color: item,
        },
      };
      inlineStyles[`backgroundColor_${item}`] = {
        style: {
          backgroundColor: item,
        },
      };
    });
    this.onChange = (editorState) => {
      this.setState({ editorState });
      const value = stateToHTML(editorState.getCurrentContent(), {
        inlineStyles,
        blockRenderers: {
          atomic: (block) => {
            const entityKey = block.getEntityAt(0);
            if (entityKey) {
              const entity = editorState.getCurrentContent().getEntity(entityKey);
              const data = entity.getData();
              switch (entity.type) {
                case 'audio':
                  return `<audio ${data.src ? `src="${data.src}"` : ''} controls ${data.autoPlay ? 'autoplay' : ''}/>`;
                case 'image':
                  return `<img ${data.width ? `width="${data.width}"` : ''} ${data.height ? `height="${data.height}"` : ''} ${data.src ? `src="${data.src}"` : ''} ${data.alt ? `alt="${data.alt}"` : ''}/>`;
                case 'video':
                  return `<video ${data.width ? `width="${data.width}"` : ''} ${data.height ? `height="${data.height}"` : ''} src="${data.src}" controls ${data.autoPlay ? 'autoplay' : ''}/>`;
                case 'flash':
                  return `<object ${data.width ? `width="${data.width}"` : ''} ${data.height ? `height="${data.height}"` : ''}><param name="movie" ${data.src ? `value="${data.src}"` : ''} /><embed ${data.src ? `src="${data.src}"` : ''} ${data.width ? `width="${data.width}"` : ''} ${data.height ? `height="${data.height}"` : ''} /></object>`;
                default:
                  break;
              }
            }
          },
        },
        blockStyleFn: (block) => {
          if (block.getData().get('alignment')) {
            return {
              style: {
                textAlign: block.getData().get('alignment'),
              },
            };
          }
        },
      });
      this.props.onChange(value);
    };
    this.customStyleMap = {
      STRIKETHROUGH: {
        textDecoration: 'line-through',
      },
    };
    this.customStyleFn = (style) => {
      const output = {};
      let fontSize = style.filter(value => value.startsWith('fontSize_')).first();
      if (fontSize) {
        fontSize = fontSize.replace('fontSize_', '');
        output.fontSize = fontSize;
      }
      let color = style.filter(value => value.startsWith('color_')).first();
      if (color) {
        color = color.replace('color_', '');
        output.color = color;
      }
      let backgroundColor = style.filter(value => value.startsWith('backgroundColor_')).first();
      if (backgroundColor) {
        backgroundColor = backgroundColor.replace('backgroundColor_', '');
        output.backgroundColor = backgroundColor;
      }
      return output;
    };
    this.blockStyleFn = (contentBlock) => {
      const data = contentBlock.getData();
      if (data.has('alignment')) {
        return `align-${data.get('alignment')}`;
      }
    };
    this.blockRendererFn = (contentBlock) => {
      const onAudioEdit = (key) => {
        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent();
        const block = contentState.getBlockForKey(key);
        const entityKey = block.getEntityAt(0);
        const entity = contentState.getEntity(entityKey);
        this.insertAudio.refs.wrappedComponent.refs.formWrappedComponent.editAudio(
          entityKey, entity.data,
        );
      };
      const onVideoEdit = (key) => {
        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent();
        const block = contentState.getBlockForKey(key);
        const entityKey = block.getEntityAt(0);
        const entity = contentState.getEntity(entityKey);
        this.insertVideo.refs.wrappedComponent.refs.formWrappedComponent.editVideo(
          entityKey, entity.data,
        );
      };
      const onImageEdit = (key) => {
        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent();
        const block = contentState.getBlockForKey(key);
        const entityKey = block.getEntityAt(0);
        const entity = contentState.getEntity(entityKey);
        this.insertImage.refs.wrappedComponent.refs.formWrappedComponent.editImage(
          entityKey, entity.data,
        );
      };
      const onFlashEdit = (key) => {
        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent();
        const block = contentState.getBlockForKey(key);
        const entityKey = block.getEntityAt(0);
        const entity = contentState.getEntity(entityKey);
        this.insertFlash.refs.wrappedComponent.refs.formWrappedComponent.editFlash(
          entityKey,
          entity.data,
        );
      };
      const onRemove = (key) => {
        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent();
        const block = contentState.getBlockForKey(key);
        const selection = new SelectionState({
          anchorKey: key,
          anchorOffset: 0,
          focusKey: key,
          focusOffset: block.getLength(),
        });
        const newContentState = Modifier.applyEntity(contentState, selection, null);
        const newEditorState = EditorState.push(editorState, newContentState, 'apply-entity');
        this.onChange(newEditorState);
      };
      if (contentBlock.getType() === 'atomic') {
        return {
          component: Media,
          editable: false,
          props: {
            onRemove,
            onImageEdit,
            onAudioEdit,
            onVideoEdit,
            onFlashEdit,
          },
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
            colors={this.colors}
          />
          <BackgroundColorPicker
            editorState={this.state.editorState}
            onChange={this.onChange}
            colors={this.colors}
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
          <InsertAudio
            ref={(insertAudio) => {
              this.insertAudio = insertAudio;
            }}
            editor={this.editor}
            editorState={this.state.editorState}
            onChange={this.onChange}
            onUpload={this.props.onAudioUpload}
          />
          <InsertImage
            ref={(insertImage) => {
              this.insertImage = insertImage;
            }}
            editor={this.editor}
            editorState={this.state.editorState}
            onChange={this.onChange}
            onUpload={this.props.onImageUpload}
          />
          <InsertVideo
            ref={(insertVideo) => {
              this.insertVideo = insertVideo;
            }}
            editor={this.editor}
            editorState={this.state.editorState}
            onChange={this.onChange}
            onUpload={this.props.onVideoUpload}
          />
          <InsertFlash
            ref={(insertFlash) => {
              this.insertFlash = insertFlash;
            }}
            editor={this.editor}
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
      </Affix>
      <div
        className="focus-editor-container"
        onClick={() => {
          this.editor.focus();
        }}
      >
        <Editor
          ref={(editor) => {
            this.editor = editor;
          }}
          editorState={this.state.editorState}
          onChange={this.onChange}
          customStyleMap={this.customStyleMap}
          customStyleFn={this.customStyleFn}
          blockStyleFn={this.blockStyleFn}
          blockRendererFn={this.blockRendererFn}
        />
      </div>
    </div>);
  }
}
FocusEditor.propTypes = {
  onAudioUpload: PropTypes.func.isRequired,
  onImageUpload: PropTypes.func.isRequired,
  onVideoUpload: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
FocusEditor.defaultProps = {
  onAudioUpload: () => {
  },
  onImageUpload: () => {
  },
  onVideoUpload: () => {
  },
  onChange: () => {
  },
};
export default FocusEditor;
