import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import { Modal, Form, Input, Upload, Icon, Row, Col, Checkbox } from 'antd';
import ToolbarButton from '../ToolbarButton';

class InsertVideo extends React.Component {
  static getValue(value) {
    let newValue = (value || '').toString();
    if (newValue && newValue.endsWith('%')) {
      const regexp = new RegExp(/^\d+(\.\d+)?/);
      const match = regexp.exec(newValue);
      if (match) {
        newValue = match[0];
      }
    }
    return newValue;
  }

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      ratio: 1,
    };
    this.closeModal = this.closeModal.bind(this);
    this.editVideo = this.editVideo.bind(this);
  }

  editVideo(entityKey, data) {
    this.setState({
      modalVisible: true,
      video: data.src,
      ratio: (data.width / data.height) || 1,
      entityKey,
    });
    this.props.form.setFieldsValue({
      src: data.src,
      autoPlay: data.autoPlay,
      controls: data.controls,
      width: data.style.width,
      height: data.style.height,
    });
  }

  closeModal() {
    this.setState({ modalVisible: false, video: undefined, entityKey: undefined });
    this.props.form.resetFields();
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const { getFieldDecorator } = this.props.form;
    const width = (400 * this.state.ratio) || 0;
    const height = (400 / this.state.ratio) || 0;
    return (<div className="focus-editor-controls-container">
      <ToolbarButton
        label={<i className="fa fa-video-camera" />}
        onClick={() => {
          this.setState({ modalVisible: true });
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
              if (this.state.entityKey) {
                const newContentState = contentState.replaceEntityData(
                  this.state.entityKey,
                  {
                    src: values.src,
                    autoPlay: values.autoPlay,
                    controls: values.controls,
                    style: {
                      width: values.width,
                      height: values.height,
                    },
                  },
                );
                const newEditorState = EditorState.set(
                  editorState,
                  { currentContent: newContentState },
                );
                this.props.onChange(newEditorState);
                this.props.editor.focus();
              } else {
                const contentStateWithEntity = contentState.createEntity(
                  'VIDEO',
                  'IMMUTABLE',
                  {
                    src: values.src,
                    autoPlay: values.autoPlay,
                    controls: values.controls,
                    style: {
                      width: values.width,
                      height: values.height,
                    },
                  },
                );
                const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                const newEditorState = EditorState.set(
                  editorState,
                  { currentContent: contentStateWithEntity },
                );
                this.props.onChange(
                  AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '),
                );
              }
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
          {this.state.video ?
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
                src={this.state.video}
                style={{
                  display: 'block',
                  maxHeight: 400,
                  maxWidth: '100%',
                  width,
                  height,
                }}
                controls
              >
                <track kind="captions" />
              </video>
            </div>
            :
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
              <p style={{ fontSize: 48, textAlign: 'center', color: '#108ee9' }}>
                <Icon type="cloud-upload-o" />
              </p>
              <p style={{ color: '#999' }}>点击或者拖动视频至此上传</p>
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
              <Input
                placeholder="请输入视频地址"
                onBlur={(e) => {
                  this.setState({ video: e.target.value });
                }}
              />,
            )}
          </Form.Item>
          <Row>
            <Col span={8}>
              <Form.Item
                label="宽度"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
                hasFeedback
              >
                {getFieldDecorator('width', {})(
                  <Input
                    placeholder="请输入宽度"
                    onChange={(e) => {
                      if (this.props.form.getFieldValue('fixed_ratio')) {
                        let value = (e.target.value / this.state.ratio).toFixed(2);
                        if (e.target.value.endsWith('%')) {
                          const regexp = new RegExp(/^\d+(\.\d+)?/);
                          const match = regexp.exec(e.target.value);
                          if (match) {
                            value = `${match[0] / this.state.ratio}%`;
                          }
                        }
                        this.props.form.setFields({
                          height: { value },
                        });
                      } else {
                        this.setState({
                          ratio: InsertVideo.getValue(e.target.value) / InsertVideo.getValue(this.props.form.getFieldValue('height')),
                        });
                      }
                    }}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="高度"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
                hasFeedback
              >
                {getFieldDecorator('height', {})(
                  <Input
                    placeholder="请输入高度"
                    onChange={(e) => {
                      if (this.props.form.getFieldValue('fixed_ratio')) {
                        let value = (e.target.value * this.state.ratio).toFixed(2);
                        if (e.target.value.endsWith('%')) {
                          const regexp = new RegExp(/^\d+(\.\d+)?/);
                          const match = regexp.exec(e.target.value);
                          if (match) {
                            value = `${match[0] * this.state.ratio}%`;
                          }
                        }
                        this.props.form.setFields({
                          width: { value },
                        });
                      } else {
                        this.setState({
                          ratio: InsertVideo.getValue(this.props.form.getFieldValue('width')) / InsertVideo.getValue(e.target.value),
                        });
                      }
                    }}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item wrapperCol={{ offset: 4 }}>
                {getFieldDecorator('fixed_ratio', { valuePropName: 'checked', initialValue: false })(
                  <Checkbox
                    onChange={(e) => {
                      if (e.target.checked) {
                        let w = this.props.form.getFieldValue('width');
                        let h = this.props.form.getFieldValue('height');
                        if (w && w.endsWith('%')) {
                          const regexp = new RegExp(/^\d+(\.\d+)?/);
                          const match = regexp.exec(w);
                          if (match) {
                            w = match[0];
                          }
                        }
                        if (w && h.endsWith('%')) {
                          const regexp = new RegExp(/^\d+(\.\d+)?/);
                          const match = regexp.exec(h);
                          if (match) {
                            h = match[0];
                          }
                        }
                        this.setState({
                          ratio: w / h,
                        });
                      }
                    }}
                  >锁定比例</Checkbox>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item
                wrapperCol={{ offset: 12 }}
              >
                {getFieldDecorator('autoPlay', { valuePropName: 'checked', initialValue: false })(
                  <Checkbox>自动播放</Checkbox>,
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                wrapperCol={{ offset: 12 }}
              >
                {getFieldDecorator('controls', { valuePropName: 'checked', initialValue: true })(
                  <Checkbox>显示控件</Checkbox>,
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>);
  }
}
InsertVideo.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onChange: PropTypes.func.isRequired,
};
export default Form.create({ withRef: true })(InsertVideo);
