import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, RichUtils } from 'draft-js';
import { Select } from 'antd';

const HeadingPicker = (props) => {
  const headings = [
    {
      title: '一级标题',
      label: <h1 style={{ margin: 0 }}>一级标题</h1>,
      type: 'header-one',
    },
    {
      title: '二级标题',
      label: <h2 style={{ margin: 0 }}>二级标题</h2>,
      type: 'header-two',
    },
    {
      title: '三级标题',
      label: <h3 style={{ margin: 0 }}>三级标题</h3>,
      type: 'header-three',
    },
    {
      title: '正文',
      label: <span>正文</span>,
      type: 'unstyled',
    },
  ];
  let current = 'unstyled';
  headings.forEach((item) => {
    if (props.editorState.getCurrentContent().getBlockForKey(
        props.editorState.getSelection().getFocusKey(),
      ).getType() === item.type) {
      current = item.type;
    }
  });
  return (<div className="focus-editor-controls-container">
    <Select
      defaultValue="unstyled"
      style={{ width: 160, margin: '0 4px' }}
      optionLabelProp="title"
      value={current}
      allowClear
      onChange={(value) => {
        props.onChange(
          RichUtils.toggleBlockType(props.editorState, value || 'unstyled'),
        );
      }}
    >
      {headings.map((heading) => {
        return (<Select.Option key={heading.type} title={heading.title} value={heading.type}>
          {heading.label}
        </Select.Option>);
      })}
    </Select>
  </div>);
};
HeadingPicker.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onChange: PropTypes.func.isRequired,
};
export default HeadingPicker;
