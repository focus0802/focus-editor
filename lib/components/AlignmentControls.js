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

var AlignmentControls = function AlignmentControls(props) {
  var toggleAlignment = function toggleAlignment(alignment) {
    props.onChange(_draftJs.EditorState.push(props.editorState, _draftJs.Modifier.setBlockData(props.editorState.getCurrentContent(), props.editorState.getSelection(), { alignment: alignment }), 'change-block-data'));
  };
  var alignment = props.editorState.getCurrentContent().getBlockForKey(props.editorState.getSelection().getFocusKey()).getData().get('alignment');
  return _react2.default.createElement(
    'div',
    { className: 'focus-editor-controls-container' },
    _react2.default.createElement(_ToolbarButton2.default, {
      label: _react2.default.createElement('i', { className: 'fa fa-align-left' }),
      onClick: function onClick() {
        return toggleAlignment('left');
      },
      active: alignment === 'left',
      tooltip: '\u5C45\u5DE6\u5BF9\u9F50'
    }),
    _react2.default.createElement(_ToolbarButton2.default, {
      label: _react2.default.createElement('i', { className: 'fa fa-align-center' }),
      onClick: function onClick() {
        return toggleAlignment('center');
      },
      active: alignment === 'center',
      tooltip: '\u5C45\u4E2D\u5BF9\u9F50'
    }),
    _react2.default.createElement(_ToolbarButton2.default, {
      label: _react2.default.createElement('i', { className: 'fa fa-align-right' }),
      onClick: function onClick() {
        return toggleAlignment('right');
      },
      active: alignment === 'right',
      tooltip: '\u5C45\u53F3\u5BF9\u9F50'
    }),
    _react2.default.createElement(_ToolbarButton2.default, {
      label: _react2.default.createElement('i', { className: 'fa fa-align-justify' }),
      onClick: function onClick() {
        return toggleAlignment('justify');
      },
      active: alignment === 'justify',
      tooltip: '\u4E24\u7AEF\u5BF9\u9F50'
    })
  );
};
AlignmentControls.propTypes = {
  editorState: _propTypes2.default.object.isRequired,
  onChange: _propTypes2.default.func.isRequired
};
exports.default = AlignmentControls;