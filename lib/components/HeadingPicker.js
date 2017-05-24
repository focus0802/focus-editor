'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/select/style/css');

var _select = require('antd/lib/select');

var _select2 = _interopRequireDefault(_select);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeadingPicker = function HeadingPicker(props) {
  var headings = [{
    title: '一级标题',
    label: _react2.default.createElement(
      'h1',
      { style: { margin: 0 } },
      '\u4E00\u7EA7\u6807\u9898'
    ),
    type: 'header-one'
  }, {
    title: '二级标题',
    label: _react2.default.createElement(
      'h2',
      { style: { margin: 0 } },
      '\u4E8C\u7EA7\u6807\u9898'
    ),
    type: 'header-two'
  }, {
    title: '三级标题',
    label: _react2.default.createElement(
      'h3',
      { style: { margin: 0 } },
      '\u4E09\u7EA7\u6807\u9898'
    ),
    type: 'header-three'
  }, {
    title: '正文',
    label: _react2.default.createElement(
      'span',
      null,
      '\u6B63\u6587'
    ),
    type: 'unstyled'
  }];
  var current = 'unstyled';
  headings.forEach(function (item) {
    if (props.editorState.getCurrentContent().getBlockForKey(props.editorState.getSelection().getFocusKey()).getType() === item.type) {
      current = item.type;
    }
  });
  return _react2.default.createElement(
    'div',
    { className: 'focus-editor-controls-container' },
    _react2.default.createElement(
      _select2.default,
      {
        defaultValue: 'unstyled',
        style: { width: 160, margin: '0 4px' },
        optionLabelProp: 'title',
        value: current,
        allowClear: true,
        onChange: function onChange(value) {
          props.onChange(_draftJs.RichUtils.toggleBlockType(props.editorState, value || 'unstyled'));
        }
      },
      headings.map(function (heading) {
        return _react2.default.createElement(
          _select2.default.Option,
          { key: heading.type, title: heading.title, value: heading.type },
          heading.label
        );
      })
    )
  );
};
HeadingPicker.propTypes = {
  editorState: _propTypes2.default.instanceOf(_draftJs.EditorState).isRequired,
  onChange: _propTypes2.default.func.isRequired
};
exports.default = HeadingPicker;