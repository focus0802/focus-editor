'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _ToolbarButton = require('./ToolbarButton');

var _ToolbarButton2 = _interopRequireDefault(_ToolbarButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListControls = function ListControls(props) {
  var type = props.editorState.getCurrentContent().getBlockForKey(props.editorState.getSelection().getFocusKey()).getType();
  return _react2.default.createElement(
    'div',
    { className: 'focus-editor-controls-container' },
    _react2.default.createElement(_ToolbarButton2.default, {
      label: _react2.default.createElement('i', { className: 'fa fa-list-ul' }),
      onClick: function onClick() {
        props.onChange(_draftJs.RichUtils.toggleBlockType(props.editorState, 'unordered-list-item'));
      },
      tooltip: '\u65E0\u5E8F\u5217\u8868',
      active: type === 'unordered-list-item'
    }),
    _react2.default.createElement(_ToolbarButton2.default, {
      label: _react2.default.createElement('i', { className: 'fa fa-list-ol' }),
      onClick: function onClick() {
        props.onChange(_draftJs.RichUtils.toggleBlockType(props.editorState, 'ordered-list-item'));
      },
      tooltip: '\u6709\u5E8F\u5217\u8868',
      active: type === 'ordered-list-item'
    })
  );
};
ListControls.propTypes = {
  editorState: _propTypes2.default.instanceOf(_draftJs.EditorState).isRequired,
  onChange: _propTypes2.default.func.isRequired
};
exports.default = ListControls;