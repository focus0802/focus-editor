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

var InlineStyleControls = function InlineStyleControls(props) {
  var toggleInlineStyle = function toggleInlineStyle(inlineStyle) {
    props.onChange(_draftJs.RichUtils.toggleInlineStyle(props.editorState, inlineStyle));
  };
  return _react2.default.createElement(
    'div',
    { className: 'focus-editor-controls-container' },
    _react2.default.createElement(_ToolbarButton2.default, {
      label: _react2.default.createElement('i', { className: 'fa fa-bold' }),
      onClick: function onClick() {
        return toggleInlineStyle('BOLD');
      },
      active: props.editorState.getCurrentInlineStyle().has('BOLD'),
      tooltip: '\u7C97\u4F53'
    }),
    _react2.default.createElement(_ToolbarButton2.default, {
      label: _react2.default.createElement('i', { className: 'fa fa-italic' }),
      onClick: function onClick() {
        return toggleInlineStyle('ITALIC');
      },
      active: props.editorState.getCurrentInlineStyle().has('ITALIC'),
      tooltip: '\u659C\u4F53'
    }),
    _react2.default.createElement(_ToolbarButton2.default, {
      label: _react2.default.createElement('i', { className: 'fa fa-underline' }),
      onClick: function onClick() {
        return toggleInlineStyle('UNDERLINE');
      },
      active: props.editorState.getCurrentInlineStyle().has('UNDERLINE'),
      tooltip: '\u4E0B\u5212\u7EBF'
    }),
    _react2.default.createElement(_ToolbarButton2.default, {
      label: _react2.default.createElement('i', { className: 'fa fa-strikethrough' }),
      onClick: function onClick() {
        return toggleInlineStyle('STRIKETHROUGH');
      },
      active: props.editorState.getCurrentInlineStyle().has('STRIKETHROUGH'),
      tooltip: '\u5220\u9664\u7EBF'
    })
  );
};
InlineStyleControls.propTypes = {
  editorState: _propTypes2.default.instanceOf(_draftJs.EditorState).isRequired,
  onChange: _propTypes2.default.func.isRequired
};
exports.default = InlineStyleControls;