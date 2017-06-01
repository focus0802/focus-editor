import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import { Form, Modal, Upload, Icon, Input, Row, Col, Checkbox, Button } from 'antd';
import ToolbarButton from '../ToolbarButton';

class InsertImage extends React.Component {
  static getValue(value) {
    let newValue = value.toString();
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
    this.newImage = this.newImage.bind(this);
    this.editImage = this.editImage.bind(this);
  }

  closeModal() {
    this.setState({
      modalVisible: false,
      image: undefined,
      ratio: 1,
      entityKey: undefined,
      data: undefined,
    });
    this.props.form.resetFields();
  }

  editImage(entityKey, data) {
    this.setState({
      modalVisible: true,
      ratio: (data.width / data.height) || 1,
      image: data.src,
      entityKey,
      data,
    });
    this.props.form.setFields({
      src: { value: data.src },
      alt: { value: data.alt },
      width: { value: data.style.width },
      height: { value: data.style.height },
    });
  }

  newImage(url) {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      this.props.form.setFields({
        width: { value: image.width },
        height: { value: image.height },
        fixed_ratio: { value: true },
      });
      this.setState({ ratio: image.width / image.height });
    };
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
        label={<i className="fa fa-picture-o" />}
        onClick={() => {
          this.setState({ modalVisible: true });
        }}
        tooltip="插入图片"
      />
      <Modal
        title="插入图片"
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
                    alt: values.alt,
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
                  'IMAGE',
                  'IMMUTABLE',
                  {
                    src: values.src,
                    alt: values.alt,
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
          accept="image/*"
          beforeUpload={(file, fileList) => {
            const callback = (url) => {
              this.newImage(url);
              this.props.form.setFields({ src: { value: url } });
              this.setState({ image: url });
            };
            this.props.onUpload(file, fileList, callback);
            return false;
          }}
        >
          {this.state.image ?
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
              <img
                src={this.state.image}
                style={{
                  display: 'block',
                  maxHeight: 400,
                  width,
                  height,
                  maxWidth: '100%',
                }}
                alt=""
              />
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
              <p style={{ color: '#999' }}>点击或者拖动图片至此上传</p>
            </div>
          }
        </Upload.Dragger>
        <Form style={{ marginTop: 16 }}>
          <Form.Item
            label="图片地址"
            {...formItemLayout}
            hasFeedback
          >
            {getFieldDecorator('src', {
              rules: [
                {
                  required: true,
                  message: '图片地址不能为空',
                },
              ],
              initialValue: this.state.data && this.state.data.src,
            })(
              <Input
                placeholder="请输入图片地址"
                onBlur={(e) => {
                  this.newImage(e.target.value);
                  this.setState({ image: e.target.value });
                }}
              />,
            )}
          </Form.Item>
          <Row>
            <Col span="8">
              <Form.Item
                label="宽度"
                hasFeedback
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
              >
                {getFieldDecorator('width', {
                  initialValue: this.state.data && this.state.data.width,
                })(
                  <Input
                    placeholder="图片宽度"
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
                          ratio: InsertImage.getValue(e.target.value) / InsertImage.getValue(this.props.form.getFieldValue('height')),
                        });
                      }
                    }}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item
                label="高度"
                hasFeedback
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
              >
                {getFieldDecorator('height', {
                  initialValue: this.state.data && this.state.data.height,
                })(
                  <Input
                    placeholder="图片高度"
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
                          ratio: InsertImage.getValue(this.props.form.getFieldValue('width')) / InsertImage.getValue(e.target.value),
                        });
                      }
                    }}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item wrapperCol={{ offset: 4 }}>
                {getFieldDecorator('fixed_ratio', {
                  valuePropName: 'checked',
                  initialValue: false,
                })(
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
                        if (h && h.endsWith('%')) {
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
          <Form.Item
            wrapperCol={{ offset: 4 }}
          >
            <Button
              onClick={() => {
                this.props.form.setFields({ width: { value: '100%' }, height: { value: undefined } });
              }}
            >自适应宽高</Button>
          </Form.Item>
          <Form.Item
            label="替代文字"
            {...formItemLayout}
            hasFeedback
          >
            {getFieldDecorator('alt', {})(
              <Input placeholder="请输入替代文字" />,
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>);
  }
}
InsertImage.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onChange: PropTypes.func.isRequired,
  onUpload: PropTypes.func,
};
InsertImage.defaultProps = {
  onUpload: () => {
  },
};
export default Form.create({ withRef: true })(InsertImage);
