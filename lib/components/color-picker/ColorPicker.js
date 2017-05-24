'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/button/style/css');

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./color-picker.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorPicker = function (_React$Component) {
  _inherits(ColorPicker, _React$Component);

  function ColorPicker(props) {
    _classCallCheck(this, ColorPicker);

    var _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ColorPicker, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return this.props.visible ? _react2.default.createElement(
        'div',
        {
          className: 'focus-color-picker'
        },
        _react2.default.createElement(
          'div',
          { className: 'focus-color-picker-list' },
          this.props.colors.map(function (color) {
            return _react2.default.createElement('div', {
              className: 'focus-color-picker-list-item',
              key: color,
              style: { backgroundColor: color },
              onClick: function onClick() {
                _this2.props.onChange(color);
              }
            });
          })
        ),
        _react2.default.createElement(
          _button2.default,
          {
            size: 'small',
            onClick: function onClick() {
              _this2.props.onChange();
            },
            type: 'dashed',
            style: { marginTop: 8, width: '100%' }
          },
          '\u81EA\u52A8'
        )
      ) : null;
    }
  }]);

  return ColorPicker;
}(_react2.default.Component);

ColorPicker.propTypes = {
  visible: _propTypes2.default.bool.isRequired,
  colors: _propTypes2.default.array.isRequired,
  onChange: _propTypes2.default.func.isRequired
};
exports.default = ColorPicker;