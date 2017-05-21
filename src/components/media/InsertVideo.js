import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import { Modal, Form, Input, Upload, Icon } from 'antd';
import ToolbarButton from '../ToolbarButton';

class InsertVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ modalVisible: false });
    this.props.form.resetFields();
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const { getFieldDecorator } = this.props.form;
    return (<div className="focus-editor-controls-container">
      <ToolbarButton
        label={<i className="fa fa-video-camera" />}
        onClick={() => {
        }}
        tooltip="插入视频"
      />
      <Modal
        title="插入视频"
        visible={this.state.modalVisible}
        maskClosable={false}
        onCancel={this.closeModal}
        onOk={() => {
          this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
              const { editorState } = this.props;
              const contentState = editorState.getCurrentContent();
              const contentStateWithEntity = contentState.createEntity(
                'video',
                'IMMUTABLE',
                values,
              );
              const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
              const newEditorState = EditorState.set(
                editorState,
                { currentContent: contentStateWithEntity },
              );
              this.props.onChange(
                AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '),
              );
              this.closeModal();
            }
          });
        }}
      >
        <Upload.Dragger
          accept="video/*"
          beforeUpload={(file, fileList) => {
            const callback = (url) => {
              this.props.form.setFields({ src: { value: url } });
              this.setState({ video: url });
            };
            this.props.onUpload(file, fileList, callback);
            return false;
          }}
        >
          {this.state.video || this.props.currentVideo ?
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: 400,
              }}
            >
              <video
                src={this.state.video || this.props.currentVideo.src}
                style={{
                  display: 'block',
                  maxHeight: 400,
                  maxWidth: '100%',
                }}
                controls
              >
                <track kind="captions" />
              </video>
            </div>
            :
            <div style={{ margin: 16 }}>
              <p style={{ fontSize: 48, textAlign: 'center', color: '#108ee9' }}>
                <Icon type="cloud-upload-o" />
              </p>
              <p style={{ color: '#999' }}>点击或者拖动图片至此上传</p>
            </div>
          }
        </Upload.Dragger>
        <Form style={{ marginTop: 16 }}>
          <Form.Item
            label="视频地址"
            {...formItemLayout}
            hasFeedback
          >
            {getFieldDecorator('src', {
              rules: [
                {
                  required: true,
                  message: '视频地址不能为空',
                },
              ],
            })(
              <Input placeholder="请输入视频地址" />,
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>);
  }
}
InsertVideo.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onChange: PropTypes.func.isRequired,
};
export default Form.create()(InsertVideo);
