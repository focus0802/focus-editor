'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/modal/style/css');

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _css2 = require('antd/lib/select/style/css');

var _select = require('antd/lib/select');

var _select2 = _interopRequireDefault(_select);

var _css3 = require('antd/lib/form/style/css');

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _css4 = require('antd/lib/input/style/css');

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _ToolbarButton = require('./ToolbarButton');

var _ToolbarButton2 = _interopRequireDefault(_ToolbarButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InsertLink = function (_React$Component) {
  _inherits(InsertLink, _React$Component);

  function InsertLink(props) {
    _classCallCheck(this, InsertLink);

    var _this = _possibleConstructorReturn(this, (InsertLink.__proto__ || Object.getPrototypeOf(InsertLink)).call(this, props));

    _this.state = {
      modalVisible: false
    };
    _this.closeModal = _this.closeModal.bind(_this);
    return _this;
  }

  _createClass(InsertLink, [{
    key: 'closeModal',
    value: function closeModal() {
      this.setState({ modalVisible: false, data: undefined });
      this.props.form.resetFields();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
      };
      var getFieldDecorator = this.props.form.getFieldDecorator;

      return _react2.default.createElement(
        'div',
        { className: 'focus-editor-link-container' },
        _react2.default.createElement(_ToolbarButton2.default, {
          label: _react2.default.createElement('i', { className: 'fa fa-link' }),
          onClick: function onClick() {
            var editorState = _this2.props.editorState;

            var selection = editorState.getSelection();
            var contentState = editorState.getCurrentContent();
            var block = contentState.getBlockForKey(selection.getFocusKey());
            var entityKey = block.getEntityAt(0);
            if (entityKey) {
              var entity = contentState.getEntity(entityKey);
              _this2.setState({ modalVisible: true, data: entity.data });
            } else {
              _this2.setState({ modalVisible: true });
            }
          },
          tooltip: '\u63D2\u5165\u94FE\u63A5',
          disabled: this.props.editorState.getSelection().isCollapsed()
        }),
        _react2.default.createElement(
          _modal2.default,
          {
            title: '\u63D2\u5165\u94FE\u63A5',
            visible: this.state.modalVisible,
            maskClosable: false,
            onCancel: this.closeModal,
            onOk: function onOk() {
              _this2.props.form.validateFieldsAndScroll(function (err, values) {
                if (!err) {
                  var editorState = _this2.props.editorState;

                  var contentState = editorState.getCurrentContent();
                  var contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', values);
                  var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                  var newEditorState = _draftJs.EditorState.set(editorState, { currentContent: contentStateWithEntity });
                  _this2.props.onChange(_draftJs.RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
                  _this2.closeModal();
                }
              });
            }
          },
          _react2.default.createElement(
            _form2.default,
            null,
            _react2.default.createElement(
              _form2.default.Item,
              _extends({
                label: '\u94FE\u63A5\u5730\u5740'
              }, formItemLayout, {
                hasFeedback: true
              }),
              getFieldDecorator('href', {
                rules: [{
                  required: true,
                  message: '链接地址不能为空'
                }],
                initialValue: this.state.data && this.state.data.href
              })(_react2.default.createElement(_input2.default, { placeholder: '\u8BF7\u8F93\u5165\u94FE\u63A5\u5730\u5740' }))
            ),
            _react2.default.createElement(
              _form2.default.Item,
              _extends({
                label: '\u6253\u5F00\u65B9\u5F0F'
              }, formItemLayout, {
                hasFeedback: true
              }),
              getFieldDecorator('target', {
                initialValue: this.state.data && this.state.data.target
              })(_react2.default.createElement(
                _select2.default,
                {
                  placeholder: '\u8BF7\u9009\u62E9\u6253\u5F00\u65B9\u5F0F',
                  allowClear: true
                },
                _react2.default.createElement(
                  _select2.default.Option,
                  { key: '_self', value: '_self' },
                  '\u5F53\u524D\u7A97\u53E3\u6253\u5F00'
                ),
                _react2.default.createElement(
                  _select2.default.Option,
                  { key: '_blank', value: '_blank' },
                  '\u65B0\u7A97\u53E3\u6253\u5F00'
                )
              ))
            )
          )
        )
      );
    }
  }]);

  return InsertLink;
}(_react2.default.Component);

InsertLink.propTypes = {
  editorState: _propTypes2.default.instanceOf(_draftJs.EditorState).isRequired,
  onChange: _propTypes2.default.func.isRequired
};
exports.default = _form2.default.create()(InsertLink);