import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, RichUtils } from 'draft-js';
import { Modal, Form, Input, Select } from 'antd';
import ToolbarButton from './ToolbarButton';

class InsertLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ modalVisible: false, data: undefined });
    this.props.form.resetFields();
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const { getFieldDecorator } = this.props.form;
    return (<div className="focus-editor-link-container">
      <ToolbarButton
        label={<i className="fa fa-link" />}
        onClick={() => {
          const { editorState } = this.props;
          const selection = editorState.getSelection();
          const contentState = editorState.getCurrentContent();
          const block = contentState.getBlockForKey(selection.getFocusKey());
          const entityKey = block.getEntityAt(0);
          if (entityKey) {
            const entity = contentState.getEntity(entityKey);
            this.setState({ modalVisible: true, data: entity.data });
          } else {
            this.setState({ modalVisible: true });
          }
        }}
        tooltip="插入链接"
        disabled={this.props.editorState.getSelection().isCollapsed()}
      />
      <Modal
        title="插入链接"
        visible={this.state.modalVisible}
        maskClosable={false}
        onCancel={this.closeModal}
        onOk={() => {
          this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
              const { editorState } = this.props;
              const contentState = editorState.getCurrentContent();
              const contentStateWithEntity = contentState.createEntity(
                'LINK',
                'MUTABLE',
                values,
              );
              const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
              const newEditorState = EditorState.set(
                editorState,
                { currentContent: contentStateWithEntity },
              );
              this.props.onChange(
                RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey),
              );
              this.closeModal();
            }
          });
        }}
      >
        <Form>
          <Form.Item
            label="链接地址"
            {...formItemLayout}
            hasFeedback
          >
            {getFieldDecorator('href', {
              rules: [
                {
                  required: true,
                  message: '链接地址不能为空',
                },
              ],
              initialValue: this.state.data && this.state.data.href,
            })(
              <Input placeholder="请输入链接地址" />,
            )}
          </Form.Item>
          <Form.Item
            label="打开方式"
            {...formItemLayout}
            hasFeedback
          >
            {getFieldDecorator('target', {
              initialValue: this.state.data && this.state.data.target,
            })(
              <Select
                placeholder="请选择打开方式"
                allowClear
              >
                <Select.Option key="_self" value="_self">当前窗口打开</Select.Option>
                <Select.Option key="_blank" value="_blank">新窗口打开</Select.Option>
              </Select>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>);
  }
}
InsertLink.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onChange: PropTypes.func.isRequired,
};
export default Form.create()(InsertLink);
