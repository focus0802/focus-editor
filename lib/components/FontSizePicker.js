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

var FontSizePicker = function FontSizePicker(props) {
  var current = void 0;
  props.fontSizes.forEach(function (item) {
    if (props.editorState.getCurrentInlineStyle().has('fontSize_' + item.value)) {
      current = item.value;
    }
  });
  return _react2.default.createElement(
    'div',
    { className: 'focus-editor-controls-container' },
    _react2.default.createElement(
      _select2.default,
      {
        placeholder: '\u5B57\u4F53\u5927\u5C0F',
        style: { width: 90, margin: '0 4px' },
        optionLabelProp: 'value',
        value: current,
        allowClear: true,
        onChange: function onChange(value) {
          var editorState = props.editorState;

          var selection = editorState.getSelection();
          var nextContentState = props.fontSizes.reduce(function (contentState, fontSize) {
            return _draftJs.Modifier.removeInlineStyle(contentState, selection, 'fontSize_' + fontSize.value);
          }, editorState.getCurrentContent());
          var nextEditorState = _draftJs.EditorState.push(editorState, nextContentState, 'change-inline-style');
          var currentStyle = editorState.getCurrentInlineStyle();
          if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce(function (state, fontSize) {
              return _draftJs.RichUtils.toggleInlineStyle(state, 'fontSize_' + fontSize);
            }, nextEditorState);
          }
          if (value && !currentStyle.has('fontSize_' + value)) {
            nextEditorState = _draftJs.RichUtils.toggleInlineStyle(nextEditorState, 'fontSize_' + value);
          }
          props.onChange(nextEditorState);
        }
      },
      props.fontSizes.map(function (item) {
        return _react2.default.createElement(
          _select2.default.Option,
          { key: item.value, value: item.value },
          item.label
        );
      })
    )
  );
};
FontSizePicker.propTypes = {
  editorState: _propTypes2.default.instanceOf(_draftJs.EditorState).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  fontSizes: _propTypes2.default.array.isRequired
};
exports.default = FontSizePicker;