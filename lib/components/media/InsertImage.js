'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/modal/style/css');

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _css2 = require('antd/lib/button/style/css');

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _css3 = require('antd/lib/row/style/css');

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _css4 = require('antd/lib/checkbox/style/css');

var _checkbox = require('antd/lib/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _css5 = require('antd/lib/col/style/css');

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _css6 = require('antd/lib/form/style/css');

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _css7 = require('antd/lib/input/style/css');

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _css8 = require('antd/lib/upload/style/css');

var _upload = require('antd/lib/upload');

var _upload2 = _interopRequireDefault(_upload);

var _css9 = require('antd/lib/icon/style/css');

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

var InsertImage = function (_React$Component) {
  _inherits(InsertImage, _React$Component);

  _createClass(InsertImage, null, [{
    key: 'getValue',
    value: function getValue(value) {
      var newValue = value.toString();
      if (newValue && newValue.endsWith('%')) {
        var regexp = new RegExp(/^\d+(\.\d+)?/);
        var match = regexp.exec(newValue);
        if (match) {
          newValue = match[0];
        }
      }
      return newValue;
    }
  }]);

  function InsertImage(props) {
    _classCallCheck(this, InsertImage);

    var _this = _possibleConstructorReturn(this, (InsertImage.__proto__ || Object.getPrototypeOf(InsertImage)).call(this, props));

    _this.state = {
      modalVisible: false,
      ratio: 1
    };
    _this.closeModal = _this.closeModal.bind(_this);
    _this.newImage = _this.newImage.bind(_this);
    _this.editImage = _this.editImage.bind(_this);
    return _this;
  }

  _createClass(InsertImage, [{
    key: 'closeModal',
    value: function closeModal() {
      this.setState({
        modalVisible: false,
        image: undefined,
        ratio: 1,
        entityKey: undefined,
        data: undefined
      });
      this.props.form.resetFields();
    }
  }, {
    key: 'editImage',
    value: function editImage(entityKey, data) {
      this.setState({
        modalVisible: true,
        ratio: data.width / data.height || 1,
        image: data.src,
        entityKey: entityKey,
        data: data
      });
    }
  }, {
    key: 'newImage',
    value: function newImage(url) {
      var _this2 = this;

      var image = new Image();
      image.src = url;
      image.onload = function () {
        _this2.props.form.setFields({
          width: { value: image.width },
          height: { value: image.height },
          fixed_ratio: { value: true }
        });
        _this2.setState({ ratio: image.width / image.height });
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
      };
      var getFieldDecorator = this.props.form.getFieldDecorator;

      var width = 400 * this.state.ratio || 0;
      var height = 400 / this.state.ratio || 0;
      return _react2.default.createElement(
        'div',
        { className: 'focus-editor-controls-container' },
        _react2.default.createElement(_ToolbarButton2.default, {
          label: _react2.default.createElement('i', { className: 'fa fa-picture-o' }),
          onClick: function onClick() {
            _this3.setState({ modalVisible: true });
          },
          tooltip: '\u63D2\u5165\u56FE\u7247'
        }),
        _react2.default.createElement(
          _modal2.default,
          {
            title: '\u63D2\u5165\u56FE\u7247',
            visible: this.state.modalVisible,
            maskClosable: false,
            onCancel: this.closeModal,
            onOk: function onOk() {
              _this3.props.form.validateFieldsAndScroll(function (err, values) {
                if (!err) {
                  var editorState = _this3.props.editorState;

                  var contentState = editorState.getCurrentContent();
                  if (_this3.state.entityKey) {
                    var newContentState = contentState.replaceEntityData(_this3.state.entityKey, values);
                    var newEditorState = _draftJs.EditorState.set(editorState, { currentContent: newContentState });
                    _this3.props.onChange(newEditorState);
                    _this3.props.editor.focus();
                  } else {
                    var contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', values);
                    var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                    var _newEditorState = _draftJs.EditorState.set(editorState, { currentContent: contentStateWithEntity });
                    _this3.props.onChange(_draftJs.AtomicBlockUtils.insertAtomicBlock(_newEditorState, entityKey, ' '));
                  }
                  _this3.closeModal();
                }
              });
            }
          },
          _react2.default.createElement(
            _upload2.default.Dragger,
            {
              accept: 'image/*',
              beforeUpload: function beforeUpload(file, fileList) {
                var callback = function callback(url) {
                  _this3.newImage(url);
                  _this3.props.form.setFields({ src: { value: url } });
                  _this3.setState({ image: url });
                };
                _this3.props.onUpload(file, fileList, callback);
                return false;
              }
            },
            this.state.image ? _react2.default.createElement(
              'div',
              {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: 400
                }
              },
              _react2.default.createElement('img', {
                src: this.state.image,
                style: {
                  display: 'block',
                  maxHeight: 400,
                  width: width,
                  height: height,
                  maxWidth: '100%'
                },
                alt: ''
              })
            ) : _react2.default.createElement(
              'div',
              {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: 400
                }
              },
              _react2.default.createElement(
                'p',
                { style: { fontSize: 48, textAlign: 'center', color: '#108ee9' } },
                _react2.default.createElement(_icon2.default, { type: 'cloud-upload-o' })
              ),
              _react2.default.createElement(
                'p',
                { style: { color: '#999' } },
                '\u70B9\u51FB\u6216\u8005\u62D6\u52A8\u56FE\u7247\u81F3\u6B64\u4E0A\u4F20'
              )
            )
          ),
          _react2.default.createElement(
            _form2.default,
            { style: { marginTop: 16 } },
            _react2.default.createElement(
              _form2.default.Item,
              _extends({
                label: '\u56FE\u7247\u5730\u5740'
              }, formItemLayout, {
                hasFeedback: true
              }),
              getFieldDecorator('src', {
                rules: [{
                  required: true,
                  message: '图片地址不能为空'
                }],
                initialValue: this.state.data && this.state.data.src
              })(_react2.default.createElement(_input2.default, {
                placeholder: '\u8BF7\u8F93\u5165\u56FE\u7247\u5730\u5740',
                onBlur: function onBlur(e) {
                  _this3.newImage(e.target.value);
                  _this3.setState({ image: e.target.value });
                }
              }))
            ),
            _react2.default.createElement(
              _row2.default,
              null,
              _react2.default.createElement(
                _col2.default,
                { span: '8' },
                _react2.default.createElement(
                  _form2.default.Item,
                  {
                    label: '\u5BBD\u5EA6',
                    hasFeedback: true,
                    labelCol: { span: 12 },
                    wrapperCol: { span: 12 }
                  },
                  getFieldDecorator('width', {
                    initialValue: this.state.data && this.state.data.width
                  })(_react2.default.createElement(_input2.default, {
                    placeholder: '\u56FE\u7247\u5BBD\u5EA6',
                    onChange: function onChange(e) {
                      if (_this3.props.form.getFieldValue('fixed_ratio')) {
                        var value = (e.target.value / _this3.state.ratio).toFixed(2);
                        if (e.target.value.endsWith('%')) {
                          var regexp = new RegExp(/^\d+(\.\d+)?/);
                          var match = regexp.exec(e.target.value);
                          if (match) {
                            value = match[0] / _this3.state.ratio + '%';
                          }
                        }
                        _this3.props.form.setFields({
                          height: { value: value }
                        });
                      } else {
                        _this3.setState({
                          ratio: InsertImage.getValue(e.target.value) / InsertImage.getValue(_this3.props.form.getFieldValue('height'))
                        });
                      }
                    }
                  }))
                )
              ),
              _react2.default.createElement(
                _col2.default,
                { span: '8' },
                _react2.default.createElement(
                  _form2.default.Item,
                  {
                    label: '\u9AD8\u5EA6',
                    hasFeedback: true,
                    labelCol: { span: 12 },
                    wrapperCol: { span: 12 }
                  },
                  getFieldDecorator('height', {
                    initialValue: this.state.data && this.state.data.height
                  })(_react2.default.createElement(_input2.default, {
                    placeholder: '\u56FE\u7247\u9AD8\u5EA6',
                    onChange: function onChange(e) {
                      if (_this3.props.form.getFieldValue('fixed_ratio')) {
                        var value = (e.target.value * _this3.state.ratio).toFixed(2);
                        if (e.target.value.endsWith('%')) {
                          var regexp = new RegExp(/^\d+(\.\d+)?/);
                          var match = regexp.exec(e.target.value);
                          if (match) {
                            value = match[0] * _this3.state.ratio + '%';
                          }
                        }
                        _this3.props.form.setFields({
                          width: { value: value }
                        });
                      } else {
                        _this3.setState({
                          ratio: InsertImage.getValue(_this3.props.form.getFieldValue('width')) / InsertImage.getValue(e.target.value)
                        });
                      }
                    }
                  }))
                )
              ),
              _react2.default.createElement(
                _col2.default,
                { span: '8' },
                _react2.default.createElement(
                  _form2.default.Item,
                  { wrapperCol: { offset: 4 } },
                  getFieldDecorator('fixed_ratio', {
                    valuePropName: 'checked',
                    initialValue: true
                  })(_react2.default.createElement(
                    _checkbox2.default,
                    {
                      onChange: function onChange(e) {
                        if (e.target.checked) {
                          var w = _this3.props.form.getFieldValue('width');
                          var h = _this3.props.form.getFieldValue('height');
                          if (w && w.endsWith('%')) {
                            var regexp = new RegExp(/^\d+(\.\d+)?/);
                            var match = regexp.exec(w);
                            if (match) {
                              w = match[0];
                            }
                          }
                          if (w && h.endsWith('%')) {
                            var _regexp = new RegExp(/^\d+(\.\d+)?/);
                            var _match = _regexp.exec(h);
                            if (_match) {
                              h = _match[0];
                            }
                          }
                          _this3.setState({
                            ratio: w / h
                          });
                        }
                      }
                    },
                    '\u9501\u5B9A\u6BD4\u4F8B'
                  ))
                )
              )
            ),
            _react2.default.createElement(
              _form2.default.Item,
              {
                wrapperCol: { offset: 4 }
              },
              _react2.default.createElement(
                _button2.default,
                {
                  onClick: function onClick() {
                    _this3.props.form.setFields({ width: { value: '100%' }, height: { value: undefined } });
                  }
                },
                '\u81EA\u9002\u5E94\u5BBD\u9AD8'
              )
            ),
            _react2.default.createElement(
              _form2.default.Item,
              _extends({
                label: '\u66FF\u4EE3\u6587\u5B57'
              }, formItemLayout, {
                hasFeedback: true
              }),
              getFieldDecorator('alt', {})(_react2.default.createElement(_input2.default, { placeholder: '\u8BF7\u8F93\u5165\u66FF\u4EE3\u6587\u5B57' }))
            )
          )
        )
      );
    }
  }]);

  return InsertImage;
}(_react2.default.Component);

InsertImage.propTypes = {
  editorState: _propTypes2.default.instanceOf(_draftJs.EditorState).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onUpload: _propTypes2.default.func
};
InsertImage.defaultProps = {
  onUpload: function onUpload() {}
};
exports.default = _form2.default.create({ withRef: true })(InsertImage);