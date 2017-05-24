'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _InsertLink = require('./InsertLink');

var _InsertLink2 = _interopRequireDefault(_InsertLink);

var _ToolbarButton = require('./ToolbarButton');

var _ToolbarButton2 = _interopRequireDefault(_ToolbarButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkControls = function LinkControls(props) {
  return _react2.default.createElement(
    'div',
    { className: 'focus-editor-controls-container' },
    _react2.default.createElement(_InsertLink2.default, {
      editorState: props.editorState,
      onChange: props.onChange
    }),
    _react2.default.createElement(_ToolbarButton2.default, {
      label: _react2.default.createElement('i', { className: 'fa fa-unlink' }),
      tooltip: '\u79FB\u9664\u94FE\u63A5',
      onClick: function onClick() {
        props.onChange(_draftJs.RichUtils.toggleLink(props.editorState, props.editorState.getSelection(), null));
      },
      disabled: props.editorState.getSelection().isCollapsed()
    })
  );
};
LinkControls.propTypes = {
  editorState: _propTypes2.default.instanceOf(_draftJs.EditorState).isRequired,
  onChange: _propTypes2.default.func.isRequired
};
exports.default = LinkControls;