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

var HistoryControls = function HistoryControls(props) {
  return _react2.default.createElement(
    'div',
    { className: 'focus-editor-controls-container' },
    _react2.default.createElement(_ToolbarButton2.default, {
      label: _react2.default.createElement('i', { className: 'fa fa-rotate-left' }),
      onClick: function onClick() {
        props.onChange(_draftJs.EditorState.undo(props.editorState));
      },
      tooltip: '\u64A4\u9500',
      disabled: !props.editorState.getUndoStack().size
    }),
    _react2.default.createElement(_ToolbarButton2.default, {
      label: _react2.default.createElement('i', { className: 'fa fa-rotate-right' }),
      onClick: function onClick() {
        props.onChange(_draftJs.EditorState.redo(props.editorState));
      },
      tooltip: '\u91CD\u505A',
      disabled: !props.editorState.getRedoStack().size
    })
  );
};
HistoryControls.propTypes = {
  editorState: _propTypes2.default.instanceOf(_draftJs.EditorState).isRequired,
  onChange: _propTypes2.default.func.isRequired
};
exports.default = HistoryControls;