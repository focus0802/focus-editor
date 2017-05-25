'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/modal/style/css');

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _css2 = require('antd/lib/form/style/css');

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _css3 = require('antd/lib/input/style/css');

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _css4 = require('antd/lib/upload/style/css');

var _upload = require('antd/lib/upload');

var _upload2 = _interopRequireDefault(_upload);

var _css5 = require('antd/lib/icon/style/css');

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _ToolbarButton = require('../ToolbarButton');

var _ToolbarButton2 = _interopRequireDefault(_ToolbarButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InsertAudio = function (_React$Component) {
  _inherits(InsertAudio, _React$Component);

  function InsertAudio(props) {
    _classCallCheck(this, InsertAudio);

    var _this = _possibleConstructorReturn(this, (InsertAudio.__proto__ || Object.getPrototypeOf(InsertAudio)).call(this, props));

    _this.state = {
      modalVisible: false
    };
    _this.closeModal = _this.closeModal.bind(_this);
    return _this;
  }

  _createClass(InsertAudio, [{
    key: 'editAudio',
    value: function editAudio(entityKey, data) {
      this.setState({ modalVisible: true, audio: data.src, entityKey: entityKey, data: data });
    }
  }, {
    key: 'closeModal',
    value: function closeModal() {
      this.setState({
        modalVisible: false,
        audio: undefined,
        entityKey: undefined,
        data: undefined
      });
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
        { className: 'focus-editor-controls-container' },
        _react2.default.createElement(_ToolbarButton2.default, {
          label: _react2.default.createElement('i', { className: 'fa fa-music' }),
          onClick: function onClick() {
            _this2.setState({ modalVisible: true });
          },
          tooltip: '\u63D2\u5165\u97F3\u9891'
        }),
        _react2.default.createElement(
          _modal2.default,
          {
            visible: this.state.modalVisible,
            title: '\u63D2\u5165\u97F3\u9891',
            maskClosable: false,
            onCancel: this.closeModal,
            onOk: function onOk() {
              _this2.props.form.validateFieldsAndScroll(function (err, values) {
                if (!err) {
                  var editorState = _this2.props.editorState;

                  var contentState = editorState.getCurrentContent();
                  var contentStateWithEntity = contentState.createEntity('AUDIO', 'IMMUTABLE', { src: values.src });
                  var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                  var newEditorState = _draftJs.EditorState.set(editorState, { currentContent: contentStateWithEntity });
                  _this2.props.onChange(_draftJs.AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
                  _this2.closeModal();
                }
              });
            }
          },
          _react2.default.createElement(
            _upload2.default.Dragger,
            {
              accept: 'audio/*',
              beforeUpload: function beforeUpload(file, fileList) {
                var callback = function callback(url) {
                  _this2.props.form.setFields({ src: { value: url } });
                  _this2.setState({ audio: url });
                };
                _this2.props.onUpload(file, fileList, callback);
                return false;
              }
            },
            this.state.audio ? _react2.default.createElement(
              'audio',
              {
                controls: true,
                src: this.state.audio,
                style: { display: 'block', minHeight: 122, maxHeight: 400, maxWidth: '100%', margin: '0 auto' }
              },
              _react2.default.createElement('track', { kind: 'captions' })
            ) : _react2.default.createElement(
              'div',
              { style: { margin: 16 } },
              _react2.default.createElement(
                'p',
                { style: { fontSize: 48, textAlign: 'center', color: '#108ee9' } },
                _react2.default.createElement(_icon2.default, { type: 'cloud-upload-o' })
              ),
              _react2.default.createElement(
                'p',
                { style: { color: '#999' } },
                '\u70B9\u51FB\u6216\u8005\u62D6\u52A8\u97F3\u9891\u81F3\u6B64\u4E0A\u4F20'
              )
            )
          ),
          _react2.default.createElement(
            _form2.default,
            { style: { marginTop: 16 } },
            _react2.default.createElement(
              _form2.default.Item,
              _extends({
                label: '\u97F3\u9891\u5730\u5740'
              }, formItemLayout, {
                hasFeedback: true
              }),
              getFieldDecorator('src', {
                rules: [{
                  required: true,
                  message: '音频地址不能为空'
                }],
                initialValue: this.state.data && this.state.data.src
              })(_react2.default.createElement(_input2.default, {
                placeholder: '\u8BF7\u8F93\u5165\u97F3\u9891\u5730\u5740',
                onBlur: function onBlur(e) {
                  _this2.setState({ audio: e.target.value });
                }
              }))
            )
          )
        )
      );
    }
  }]);

  return InsertAudio;
}(_react2.default.Component);

InsertAudio.propTypes = {
  editorState: _propTypes2.default.instanceOf(_draftJs.EditorState).isRequired,
  onChange: _propTypes2.default.func.isRequired
};
exports.default = _form2.default.create({ withRef: true })(InsertAudio);