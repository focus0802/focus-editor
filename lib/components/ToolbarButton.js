'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/tooltip/style/css');

var _tooltip = require('antd/lib/tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = require('class-names');

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToolbarButton = function ToolbarButton(props) {
  var content = _react2.default.createElement(
    'div',
    {
      className: (0, _classNames2.default)('focus-editor-toolbar-button', { 'focus-editor-toolbar-button-disabled': props.disabled }, { 'focus-editor-toolbar-button-active': props.active }),
      onClick: props.onClick
    },
    props.label
  );
  return props.tooltip ? _react2.default.createElement(
    _tooltip2.default,
    { placement: 'top', overlay: props.tooltip },
    content
  ) : content;
};
ToolbarButton.propTypes = {
  label: _propTypes2.default.element.isRequired,
  onClick: _propTypes2.default.func.isRequired,
  disabled: _propTypes2.default.bool,
  active: _propTypes2.default.bool,
  tooltip: _propTypes2.default.string
};
ToolbarButton.defaultProps = {
  disabled: false,
  active: false,
  tooltip: undefined
};
exports.default = ToolbarButton;