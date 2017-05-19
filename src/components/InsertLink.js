import React from 'react';
import { EditorState, RichUtils } from 'draft-js';
import ToolbarButton from './ToolbarButton';

class InsertLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowVisible: false,
    };
  }

  componentDidMount() {
    document.onclick = () => {
      this.setState({
        windowVisible: false,
      });
    };
  }

  render() {
    return (<div className="focus-editor-link-container">
      <ToolbarButton
        label={<i className="fa fa-link" />}
        onClick={(e) => {
          e.nativeEvent.stopImmediatePropagation();
          if (!this.props.editorState.getSelection().isCollapsed()) {
            this.setState({ windowVisible: true });
          }
        }}
        tooltip="插入链接"
        disabled={this.props.editorState.getSelection().isCollapsed()}
      />
      {this.state.windowVisible ? <div
        className="focus-editor-link-window"
        onClick={(e) => {
          e.nativeEvent.stopImmediatePropagation();
        }}
      >
        <input
          onChange={(e) => {
            this.setState({ href: e.target.value });
          }}
          placeholder="请输入链接地址"
          type="text"
        />
        <div className="focus-editor-link-window-actions">
          <button
            className="focus-editor-button focus-editor-button-default"
            onClick={() => {
              this.setState({ windowVisible: false });
            }}
          >取消
          </button>
          <button
            className="focus-editor-button focus-editor-button-primary"
            onClick={() => {
              if (this.state.href) {
                const { editorState } = this.props;
                const contentState = editorState.getCurrentContent();
                const contentStateWithEntity = contentState.createEntity(
                  'LINK',
                  'MUTABLE',
                  { href: this.state.href },
                );
                const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                const newEditorState = EditorState.set(editorState,
                  { currentContent: contentStateWithEntity });
                this.props.onChange(
                  RichUtils.toggleLink(
                    newEditorState,
                    newEditorState.getSelection(),
                    entityKey,
                  ),
                );
                this.setState({ windowVisible: false });
              }
            }}
          >插入
          </button>
        </div>
      </div> : null}
    </div>);
  }
}
InsertLink.propTypes = {};
export default InsertLink;
