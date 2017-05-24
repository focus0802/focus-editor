import React from 'react';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import { Modal, Form, Input, Row, Col, Checkbox } from 'antd';
import ToolbarButton from '../ToolbarButton';

class InsertFlash extends React.Component {
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
    this.editFlash = this.editFlash.bind(this);
  }

  editFlash(entityKey, data) {
    this.setState({ modalVisible: true, flash: data.src, entityKey, data });
  }

  closeModal() {
    this.setState({ modalVisible: false, flash: undefined, entityKey: undefined, data: undefined });
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
        label={<i className="fa fa-flash" />}
        tooltip="插入Flash"
        onClick={() => {
          this.setState({ modalVisible: true });
        }}
      />
      <Modal
        title="插入Flash"
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
                  values,
                );
                const newEditorState = EditorState.set(
                  editorState,
                  { currentContent: newContentState },
                );
                this.props.onChange(newEditorState);
                this.props.editor.focus();
              } else {
                const contentStateWithEntity = contentState.createEntity(
                  'flash',
                  'IMMUTABLE',
                  values,
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
              this.closeModal();
            }
          });
        }}
      >
        {this.state.flash ?
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
            <object
              style={{
                display: 'block',
                maxHeight: 400,
                maxWidth: '100%',
                width,
                height,
              }}
            >
              <param
                name="movie"
                value={this.state.flash}
              />
              <param name="quality" value="high" />
              <embed type="application/x-shockwave-flash" src={this.state.flash} />
            </object>
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
              Flash
            </p>
            <p style={{ color: '#999' }}>请输入Flash(swf)地址</p>
          </div>
        }
        <Form style={{ marginTop: 16 }}>
          <Form.Item
            label="Flash地址"
            {...formItemLayout}
            hasFeedback
          >
            {getFieldDecorator('src', {
              rules: [
                {
                  required: true,
                  message: 'Flash地址不能为空',
                },
              ],
              initialValue: this.state.data && this.state.data.src,
            })(
              <Input
                placeholder="请输入Flash地址"
                onBlur={(e) => {
                  this.setState({ flash: e.target.value });
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
                {getFieldDecorator('width', {
                  initialValue: this.state.data && this.state.data.width,
                })(
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
                          ratio: InsertFlash.getValue(e.target.value) / InsertFlash.getValue(this.props.form.getFieldValue('height')),
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
                {getFieldDecorator('height', {
                  initialValue: this.state.data && this.state.data.height,
                })(
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
                          ratio: InsertFlash.getValue(this.props.form.getFieldValue('width')) / InsertFlash.getValue(e.target.value),
                        });
                      }
                    }}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item wrapperCol={{ offset: 4 }}>
                {getFieldDecorator('fixed_ratio', { valuePropName: 'checked', initialValue: true })(
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
        </Form>
      </Modal>
    </div>);
  }
}
export default Form.create({ withRef: true })(InsertFlash);
