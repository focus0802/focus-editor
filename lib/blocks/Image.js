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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Image = function Image(props) {
  return _react2.default.createElement(
    _tooltip2.default,
    {
      placement: 'topLeft',
      overlay: _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'a',
          {
            style: {
              color: '#fff',
              marginRight: 8
            },
            onClick: props.onEdit
          },
          '\u4FEE\u6539'
        ),
        _react2.default.createElement(
          'a',
          {
            style: {
              color: '#fff'
            },
            onClick: props.onRemove
          },
          '\u5220\u9664'
        )
      )
    },
    _react2.default.createElement('img', { src: props.src, alt: props.alt, style: props.style })
  );
};
Image.propTypes = {
  onEdit: _propTypes2.default.func.isRequired,
  onRemove: _propTypes2.default.func.isRequired
};
Image.defaultProps = {
  onEdit: function onEdit() {},
  onRemove: function onRemove() {}
};
exports.default = Image;