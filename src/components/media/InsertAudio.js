import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import { Modal, Form, Input, Upload, Icon } from 'antd';
import ToolbarButton from '../ToolbarButton';

class InsertAudio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
    };
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const { getFieldDecorator } = this.props.form;
    return (<div className="focus-editor-controls-container">
      <ToolbarButton
        label={<i className="fa fa-music" />}
        onClick={() => {
          console.log(this.props.editorState, this.props.onChange);
          this.setState({ modalVisible: true });
        }}
        tooltip="插入音频"
      />
      <Modal
        visible={this.state.modalVisible}
        title="插入音频"
        maskClosable={false}
        onCancel={() => this.setState({ modalVisible: false })}
        onOk={() => {
          this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
              const { editorState } = this.props;
              const contentState = editorState.getCurrentContent();
              const contentStateWithEntity = contentState.createEntity(
                'audio',
                'IMMUTABLE',
                { src: values.src },
              );
              const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
              const newEditorState = EditorState.set(
                editorState,
                { currentContent: contentStateWithEntity },
              );
              this.props.onChange(
                AtomicBlockUtils.insertAtomicBlock(
                  newEditorState,
                  entityKey,
                  ' ',
                ),
              );
            }
          });
        }}
      >
        <Upload.Dragger
          accept="audio/mp3,audio/wav"
          beforeUpload={(file, fileList) => {
            const callback = (url) => {
              this.props.form.setFields({ src: { value: url } });
              this.setState({ audio: url });
            };
            this.props.onUpload(file, fileList, callback);
            return false;
          }}
        >
          {this.state.audio || this.props.currentAudio ?
            <audio
              controls
              src={this.state.audio || this.props.currentAudio.src}
              style={{ display: 'block', minHeight: 122, maxHeight: 400, maxWidth: '100%', margin: '0 auto' }}
            >
              <track kind="captions" />
            </audio>
            :
            <div style={{ margin: 16 }}>
              <p style={{ fontSize: 48, textAlign: 'center', color: '#108ee9' }}>
                <Icon type="cloud-upload-o" />
              </p>
              <p style={{ color: '#999' }}>点击或者拖动音频至此上传</p>
            </div>
          }
        </Upload.Dragger>
        <Form style={{ marginTop: 16 }}>
          <Form.Item
            label="音频地址"
            {...formItemLayout}
            hasFeedback
          >
            {getFieldDecorator('src', {
              rules: [
                {
                  required: true,
                  message: '音频地址不能为空',
                },
              ],
            })(
              <Input
                placeholder="请输入音频地址"
                onBlur={(e) => {
                  this.setState({ audio: e.target.value });
                }}
              />,
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>);
  }
}
InsertAudio.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onChange: PropTypes.func.isRequired,
};
export default Form.create()(InsertAudio);
