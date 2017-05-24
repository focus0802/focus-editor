'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _ToolbarButton = require('./ToolbarButton');

var _ToolbarButton2 = _interopRequireDefault(_ToolbarButton);

var _ColorPicker = require('./color-picker/ColorPicker');

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BackgroundColorPicker = function (_React$Component) {
  _inherits(BackgroundColorPicker, _React$Component);

  function BackgroundColorPicker(props) {
    _classCallCheck(this, BackgroundColorPicker);

    var _this = _possibleConstructorReturn(this, (BackgroundColorPicker.__proto__ || Object.getPrototypeOf(BackgroundColorPicker)).call(this, props));

    _this.state = {
      pickerVisible: false
    };
    return _this;
  }

  _createClass(BackgroundColorPicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      document.addEventListener('click', function () {
        _this2.setState({
          pickerVisible: false
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: 'focus-editor-controls-container' },
        _react2.default.createElement(_ToolbarButton2.default, {
          label: _react2.default.createElement('i', { className: 'fa fa-square' }),
          tooltip: '\u80CC\u666F\u989C\u8272',
          onClick: function onClick(e) {
            e.nativeEvent.stopImmediatePropagation();
            _this3.setState({ pickerVisible: !_this3.state.pickerVisible });
          }
        }),
        _react2.default.createElement(
          'div',
          {
            onClick: function onClick(e) {
              e.nativeEvent.stopImmediatePropagation();
            }
          },
          _react2.default.createElement(_ColorPicker2.default, {
            colors: this.props.colors,
            visible: this.state.pickerVisible,
            onChange: function onChange(value) {
              var editorState = _this3.props.editorState;

              var selection = editorState.getSelection();
              var nextContentState = _this3.props.colors.reduce(function (contentState, color) {
                return _draftJs.Modifier.removeInlineStyle(contentState, selection, 'backgroundColor_' + color);
              }, editorState.getCurrentContent());
              var nextEditorState = _draftJs.EditorState.push(editorState, nextContentState, 'change-inline-style');
              var currentStyle = editorState.getCurrentInlineStyle();
              if (selection.isCollapsed()) {
                nextEditorState = currentStyle.reduce(function (state, color) {
                  return _draftJs.RichUtils.toggleInlineStyle(state, 'backgroundColor_' + color);
                }, nextEditorState);
              }
              if (value && !currentStyle.has('backgroundColor_' + value)) {
                nextEditorState = _draftJs.RichUtils.toggleInlineStyle(nextEditorState, 'backgroundColor_' + value);
              }
              _this3.props.onChange(nextEditorState);
              _this3.setState({ pickerVisible: false });
            }
          })
        )
      );
    }
  }]);

  return BackgroundColorPicker;
}(_react2.default.Component);

BackgroundColorPicker.propTypes = {
  editorState: _propTypes2.default.instanceOf(_draftJs.EditorState).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  colors: _propTypes2.default.array.isRequired
};
exports.default = BackgroundColorPicker;