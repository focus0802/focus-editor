import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';
import { Editor, EditorState, ContentState, Entity, SelectionState, Modifier, CompositeDecorator } from 'draft-js';
import { convertFromHTML, convertToHTML } from 'draft-convert';
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
  static fromHTML(value) {
    return convertFromHTML({
      htmlToStyle: (nodeName, node, currentStyle) => {
        let style = currentStyle;
        if (nodeName === 'span') {
          if (node.style.color) {
            style = style.add(`color_${node.style.color}`);
          }
          if (node.style.fontSize) {
            style = style.add(`fontSize_${node.style.fontSize}`);
          }
          if (node.style.backgroundColor) {
            style = style.add(`backgroundColor_${node.style.backgroundColor}`);
          }
        }
        return style;
      },
      htmlToEntity: (nodeName, node) => {
        if (nodeName === 'a') {
          return Entity.create(
            'LINK',
            'MUTABLE',
            { href: node.href, target: node.target },
          );
        }

        if (nodeName === 'embed') {
          return Entity.create(
            'FLASH',
            'IMMUTABLE',
            {
              src: node.src,
              style: { width: node.style.width, height: node.style.height },
            },
          );
        }
        if (nodeName === 'img') {
          return Entity.create('IMAGE', 'IMMUTABLE', {
            src: node.src,
            alt: node.alt,
            style: { width: node.style.width, height: node.style.height },
          });
        }
        if (nodeName === 'video') {
          return Entity.create('VIDEO', 'IMMUTABLE', {
            src: node.src,
            autoPlay: node.autoplay,
            controls: node.controls,
            style: { width: node.style.width, height: node.style.height },
          });
        }
        if (nodeName === 'audio') {
          return Entity.create('AUDIO', 'IMMUTABLE', {
            src: node.src,
            controls: node.controls,
            autoPlay: node.autoplay,
          });
        }
      },
      htmlToBlock: (nodeName, node) => {
        const data = {};
        if (node.style && node.style.textAlign) {
          data.alignment = node.style.textAlign;
        }
        if (nodeName === 'figure') {
          return { type: 'atomic', data };
        }
        if (nodeName === 'img' || nodeName === 'video' || nodeName === 'audio' || nodeName === 'embed') {
          return {
            type: 'atomic',
            data: { src: node.src, alt: node.alt, style: node.style },
          };
        }
        return {
          data,
        };
      },
    })(value);
  }

  static toHTML(contentState) {
    const nonBreakingContentState = ContentState.createFromBlockArray(
      contentState.getBlocksAsArray().map(
        (block) => {
          return block.update('text', (text) => {
            const reg = new RegExp(' ', 'g');
            return text.replace(reg, '\xA0');
          });
        },
      ),
    );
    const html = convertToHTML({
      styleToHTML: (style) => {
        if (style.startsWith('fontSize_')) {
          const fontSize = style.replace('fontSize_', '');
          return <span style={{ fontSize }} />;
        }
        if (style.startsWith('color_')) {
          const color = style.replace('color_', '');
          return <span style={{ color }} />;
        }
        if (style.startsWith('backgroundColor_')) {
          const backgroundColor = style.replace('backgroundColor_', '');
          return <span style={{ backgroundColor }} />;
        }
        if (style === 'BOLD') {
          return <b />;
        }
      },
      blockToHTML: (block) => {
        const textAlign = block.data.alignment;
        if (block.type === 'header-one') {
          return <h1 style={{ textAlign }} />;
        }
        if (block.type === 'header-two') {
          return <h2 style={{ textAlign }} />;
        }
        if (block.type === 'header-three') {
          return <h3 style={{ textAlign }} />;
        }
        if (block.type === 'header-four') {
          return <h4 style={{ textAlign }} />;
        }
        if (block.type === 'header-five') {
          return <h5 style={{ textAlign }} />;
        }
        if (block.type === 'header-six') {
          return <h6 style={{ textAlign }} />;
        }
        if (block.type === 'unstyled') {
          return <p style={{ textAlign }} />;
        }
        if (block.type === 'atomic') {
          return <figure style={{ textAlign }} />;
        }
      },
      entityToHTML: (entity, originalText) => {
        if (entity.type === 'LINK') {
          return <a href={entity.data.href} target={entity.data.target}>{originalText}</a>;
        }
        if (entity.type === 'FLASH') {
          return (<figure>
            <embed src={entity.data.src} type="application/x-shockwave-flash" style={entity.data.style} />
          </figure>);
        }
        if (entity.type === 'VIDEO') {
          return (<figure>
            <video
              src={entity.data.src}
              autoPlay={entity.data.autoPlay}
              controls={entity.data.controls}
              style={entity.data.style}
            >
              <track kind="captions" />
            </video>
          </figure>);
        }
        if (entity.type === 'AUDIO') {
          return (<figure>
            <audio
              src={entity.data.src}
              autoPlay={entity.data.autoPlay}
              controls={entity.data.controls}
              style={entity.data.style}
            >
              <track kind="captions" />
            </audio>
          </figure>);
        }
        if (entity.type === 'IMAGE') {
          return (<figure>
            <img src={entity.data.src} alt={entity.data.alt} style={entity.data.style} />
          </figure>);
        }
        return originalText;
      },
    })(nonBreakingContentState);
    const reg = new RegExp('\xA0', 'g');
    return html === '<p></p>' ? undefined : html.replace(reg, '&nbsp;');
  }

  constructor(props) {
    super(props);
    this.initialized = false;
    this.decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ]);
    this.state = {
      editorState: this.props.value
        ? EditorState.createWithContent(FocusEditor.fromHTML(this.props.value), this.decorator)
        : EditorState.createEmpty(this.decorator),
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
      setTimeout(() => {
        this.props.onChange(FocusEditor.toHTML(editorState.getCurrentContent()));
      }, 0);
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
      const onSelect = (key) => {
        const { editorState } = this.state;
        const contentState = editorState.getCurrentContent();
        const block = contentState.getBlockForKey(key);
        const selection = new SelectionState({
          anchorKey: key,
          anchorOffset: 0,
          focusKey: key,
          focusOffset: block.getLength(),
        });
        this.onChange(EditorState.acceptSelection(editorState, selection));
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
            onSelect,
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

  componentDidMount() {
    // this.editor.focus();
  }

  componentWillReceiveProps(newProps) {
    if (!this.initialized && newProps.value) {
      this.setState({
        editorState: EditorState.createWithContent(
          FocusEditor.fromHTML(newProps.value),
          this.decorator,
        ),
      });
      this.initialized = true;
    }
  }

  componentWillUnmount() {
    this.initialized = false;
  }

  render() {
    return (<div
      className={classNames(
        'focus-editor',
        { 'focus-editor-fullscreen': this.state.fullScreen },
      )}
    >
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
      <div
        className="focus-editor-container"
        onClick={() => {
          this.editor.focus();
        }}
        style={{ height: this.state.fullScreen ? undefined : this.props.editorHeight }}
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
  editorHeight: PropTypes.any,
  onAudioUpload: PropTypes.func.isRequired,
  onImageUpload: PropTypes.func.isRequired,
  onVideoUpload: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
FocusEditor.defaultProps = {
  editorHeight: 600,
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
