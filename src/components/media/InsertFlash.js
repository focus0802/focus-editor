import React from 'react';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import { Modal, Form, Input } from 'antd';
import ToolbarButton from '../ToolbarButton';

class InsertFlash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const { getFieldDecorator } = this.props.form;
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
              this.closeModal();
            }
          });
        }}
      >
        <Form>
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
            })(
              <Input placeholder="请输入Flash地址" />,
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>);
  }
}
export default Form.create()(InsertFlash);
