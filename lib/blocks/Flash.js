'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/tooltip/style/css');

var _tooltip = require('antd/lib/tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Flash = function Flash(props) {
  return _react2.default.createElement(
    _tooltip2.default,
    {
      placement: 'topLeft',
      overlay: _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'a',
          { onClick: props.onEdit, style: { color: '#fff', marginRight: 8 } },
          '\u4FEE\u6539'
        ),
        _react2.default.createElement(
          'a',
          { onClick: props.onRemove, style: { color: '#fff' } },
          '\u5220\u9664'
        )
      )
    },
    _react2.default.createElement(
      'object',
      {
        width: props.width,
        height: props.height
      },
      _react2.default.createElement('param', {
        name: 'movie',
        value: props.src
      }),
      _react2.default.createElement('param', { name: 'quality', value: 'high' }),
      _react2.default.createElement('embed', {
        type: 'application/x-shockwave-flash',
        src: props.src,
        width: props.width,
        height: props.height
      })
    )
  );
};
exports.default = Flash;