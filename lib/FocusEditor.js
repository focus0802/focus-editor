'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/affix/style/css');

var _affix = require('antd/lib/affix');

var _affix2 = _interopRequireDefault(_affix);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classNames = require('class-names');

var _classNames2 = _interopRequireDefault(_classNames);

var _draftJs = require('draft-js');

var _draftConvert = require('draft-convert');

require('font-awesome/css/font-awesome.min.css');

require('./focus-editor.css');

var _InlineStyleControls = require('./components/InlineStyleControls');

var _InlineStyleControls2 = _interopRequireDefault(_InlineStyleControls);

var _AlignmentControls = require('./components/AlignmentControls');

var _AlignmentControls2 = _interopRequireDefault(_AlignmentControls);

var _HistoryControls = require('./components/HistoryControls');

var _HistoryControls2 = _interopRequireDefault(_HistoryControls);

var _HeadingPicker = require('./components/HeadingPicker');

var _HeadingPicker2 = _interopRequireDefault(_HeadingPicker);

var _ListControls = require('./components/ListControls');

var _ListControls2 = _interopRequireDefault(_ListControls);

var _Link = require('./decorators/Link');

var _Link2 = _interopRequireDefault(_Link);

var _LinkControls = require('./components/LinkControls');

var _LinkControls2 = _interopRequireDefault(_LinkControls);

var _Media = require('./blocks/Media');

var _Media2 = _interopRequireDefault(_Media);

var _ToolbarButton = require('./components/ToolbarButton');

var _ToolbarButton2 = _interopRequireDefault(_ToolbarButton);

var _FontSizePicker = require('./components/FontSizePicker');

var _FontSizePicker2 = _interopRequireDefault(_FontSizePicker);

var _TextColorPicker = require('./components/TextColorPicker');

var _TextColorPicker2 = _interopRequireDefault(_TextColorPicker);

var _BackgroundColorPicker = require('./components/BackgroundColorPicker');

var _BackgroundColorPicker2 = _interopRequireDefault(_BackgroundColorPicker);

var _InsertImage = require('./components/media/InsertImage');

var _InsertImage2 = _interopRequireDefault(_InsertImage);

var _InsertAudio = require('./components/media/InsertAudio');

var _InsertAudio2 = _interopRequireDefault(_InsertAudio);

var _InsertVideo = require('./components/media/InsertVideo');

var _InsertVideo2 = _interopRequireDefault(_InsertVideo);

var _InsertFlash = require('./components/media/InsertFlash');

var _InsertFlash2 = _interopRequireDefault(_InsertFlash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FocusEditor = function (_React$Component) {
  _inherits(FocusEditor, _React$Component);

  _createClass(FocusEditor, null, [{
    key: 'fromHTML',
    value: function fromHTML(value) {
      return (0, _draftConvert.convertFromHTML)({
        htmlToStyle: function htmlToStyle(nodeName, node, currentStyle) {
          var style = currentStyle;
          if (nodeName === 'span') {
            if (node.style.color) {
              style = style.add('color_' + node.style.color);
            }
            if (node.style.fontSize) {
              style = style.add('fontSize_' + node.style.fontSize);
            }
            if (node.style.backgroundColor) {
              style = style.add('backgroundColor_' + node.style.backgroundColor);
            }
          }
          return style;
        },
        htmlToEntity: function htmlToEntity(nodeName, node) {
          if (nodeName === 'a') {
            return _draftJs.Entity.create('LINK', 'MUTABLE', { href: node.href, target: node.target });
          }

          if (nodeName === 'embed') {
            return _draftJs.Entity.create('FLASH', 'IMMUTABLE', {
              src: node.src,
              style: { width: node.style.width, height: node.style.height }
            });
          }
          if (nodeName === 'img') {
            return _draftJs.Entity.create('IMAGE', 'IMMUTABLE', {
              src: node.src,
              alt: node.alt,
              style: { width: node.style.width, height: node.style.height }
            });
          }
          if (nodeName === 'video') {
            return _draftJs.Entity.create('VIDEO', 'IMMUTABLE', {
              src: node.src,
              autoPlay: node.autoplay,
              style: { width: node.style.width, height: node.style.height }
            });
          }
          if (nodeName === 'audio') {
            return _draftJs.Entity.create('AUDIO', 'IMMUTABLE', {
              src: node.src,
              autoPlay: node.autoplay
            });
          }
        },
        htmlToBlock: function htmlToBlock(nodeName, node) {
          var data = {};
          if (node.style && node.style.textAlign) {
            data.alignment = node.style.textAlign;
          }
          if (nodeName === 'img' || nodeName === 'video' || nodeName === 'audio' || nodeName === 'embed') {
            return {
              type: 'atomic',
              data: { src: node.src, alt: node.alt, style: node.style }
            };
          }
          return {
            data: data
          };
        }
      })(value);
    }
  }, {
    key: 'toHTML',
    value: function toHTML(contentState) {
      var html = (0, _draftConvert.convertToHTML)({
        styleToHTML: function styleToHTML(style) {
          if (style.startsWith('fontSize_')) {
            var fontSize = style.replace('fontSize_', '');
            return _react2.default.createElement('span', { style: { fontSize: fontSize } });
          }
          if (style.startsWith('color_')) {
            var color = style.replace('color_', '');
            return _react2.default.createElement('span', { style: { color: color } });
          }
          if (style.startsWith('backgroundColor_')) {
            var backgroundColor = style.replace('backgroundColor_', '');
            return _react2.default.createElement('span', { style: { backgroundColor: backgroundColor } });
          }
          if (style === 'BOLD') {
            return _react2.default.createElement('b', null);
          }
        },
        blockToHTML: function blockToHTML(block) {
          var textAlign = block.data.alignment;
          if (block.type === 'unstyled') {
            return _react2.default.createElement('p', { style: { textAlign: textAlign } });
          }
          if (block.type === 'atomic') {
            return _react2.default.createElement('figure', { style: { textAlign: textAlign } });
          }
        },
        entityToHTML: function entityToHTML(entity, originalText) {
          if (entity.type === 'LINK') {
            return _react2.default.createElement(
              'a',
              { href: entity.data.href, target: entity.data.target },
              originalText
            );
          }
          if (entity.type === 'FLASH') {
            return _react2.default.createElement(
              'figure',
              null,
              _react2.default.createElement('embed', { src: entity.data.src, type: 'application/x-shockwave-flash', style: entity.data.style })
            );
          }
          if (entity.type === 'VIDEO') {
            return _react2.default.createElement(
              'figure',
              null,
              _react2.default.createElement(
                'video',
                { src: entity.data.src, autoPlay: entity.data.autoPlay },
                _react2.default.createElement('track', { kind: 'captions' })
              )
            );
          }
          if (entity.type === 'AUDIO') {
            return _react2.default.createElement(
              'figure',
              null,
              _react2.default.createElement(
                'audio',
                { src: entity.data.src, autoPlay: entity.data.autoPlay },
                _react2.default.createElement('track', { kind: 'captions' })
              )
            );
          }
          if (entity.type === 'IMAGE') {
            return _react2.default.createElement(
              'figure',
              null,
              _react2.default.createElement('img', { src: entity.data.src, alt: entity.data.alt, style: entity.data.style })
            );
          }
          return originalText;
        }
      })(contentState);
      return html === '<p></p>' ? undefined : html;
    }
  }]);

  function FocusEditor(props) {
    _classCallCheck(this, FocusEditor);

    var _this = _possibleConstructorReturn(this, (FocusEditor.__proto__ || Object.getPrototypeOf(FocusEditor)).call(this, props));

    _this.initialized = false;
    _this.decorator = new _draftJs.CompositeDecorator([{
      strategy: _Link.findLinkEntities,
      component: _Link2.default
    }]);
    _this.state = {
      editorState: _this.props.value ? _draftJs.EditorState.createWithContent(FocusEditor.fromHTML(_this.props.value), _this.decorator) : _draftJs.EditorState.createEmpty(_this.decorator)
    };
    _this.fontSizes = [{
      label: _react2.default.createElement(
        'span',
        { style: { fontSize: 12 } },
        '12px'
      ),
      value: '12px'
    }, {
      label: _react2.default.createElement(
        'span',
        { style: { fontSize: 14 } },
        '14px'
      ),
      value: '14px'
    }, {
      label: _react2.default.createElement(
        'span',
        { style: { fontSize: 16 } },
        '16px'
      ),
      value: '16px'
    }, {
      label: _react2.default.createElement(
        'span',
        { style: { fontSize: 18 } },
        '18px'
      ),
      value: '18px'
    }, {
      label: _react2.default.createElement(
        'span',
        { style: { fontSize: 20 } },
        '20px'
      ),
      value: '20px'
    }, {
      label: _react2.default.createElement(
        'span',
        { style: { fontSize: 22 } },
        '22px'
      ),
      value: '22px'
    }, {
      label: _react2.default.createElement(
        'span',
        { style: { fontSize: 24 } },
        '24px'
      ),
      value: '24px'
    }, {
      label: _react2.default.createElement(
        'span',
        { style: { fontSize: 28 } },
        '28px'
      ),
      value: '28px'
    }, {
      label: _react2.default.createElement(
        'span',
        { style: { fontSize: 32 } },
        '32px'
      ),
      value: '32px'
    }];
    _this.colors = ['#880a38', '#a31837', '#bd2636', '#d73435', '#f04134', '#f46e65', '#f79992', '#fabeb9', '#004c32', '#00643b', '#007b43', '#00924c', '#00a854', '#3dbd7d', '#76d0a3', '#a7e1c4', '#073069', '#09488a', '#0c60aa', '#0e77ca', '#108ee9', '#49a9ee', '#7ec2f3', '#add8f7', '#8c0776', '#a71278', '#c11c7b', '#dc277d', '#f5317f', '#f7629e', '#fa90ba', '#fcb8d3', '#7a0000', '#991b00', '#b93600', '#d75000', '#f56a00', '#f78e3d', '#faaf76', '#fccca7', '#321580', '#42299a', '#533eb4', '#6252cd', '#7265e6', '#948aec', '#b3acf2', '#cfcaf6', '#802800', '#a04f00', '#c17500', '#e09a00', '#ffbf00', '#ffce3d', '#ffdd76', '#ffe9a7', '#003c4e', '#005667', '#00707f', '#008997', '#00a2ae', '#3db8c1', '#76cdd3', '#a7dfe3', '#222222', '#404040', '#5a5a5a', '#919191', '#bfbfbf', '#d9d9d9', '#e9e9e9', '#f5f5f5'];
    var inlineStyles = {
      BOLD: { element: 'b' },
      ITALIC: { element: 'i' }
    };
    _this.fontSizes.forEach(function (item) {
      inlineStyles['fontSize_' + item.value] = {
        style: {
          fontSize: item.value
        }
      };
    });
    _this.colors.forEach(function (item) {
      inlineStyles['color_' + item] = {
        style: {
          color: item
        }
      };
      inlineStyles['backgroundColor_' + item] = {
        style: {
          backgroundColor: item
        }
      };
    });
    _this.onChange = function (editorState) {
      _this.setState({ editorState: editorState });
      setTimeout(function () {
        _this.props.onChange(FocusEditor.toHTML(editorState.getCurrentContent()));
      }, 0);
    };
    _this.customStyleMap = {
      STRIKETHROUGH: {
        textDecoration: 'line-through'
      }
    };
    _this.customStyleFn = function (style) {
      var output = {};
      var fontSize = style.filter(function (value) {
        return value.startsWith('fontSize_');
      }).first();
      if (fontSize) {
        fontSize = fontSize.replace('fontSize_', '');
        output.fontSize = fontSize;
      }
      var color = style.filter(function (value) {
        return value.startsWith('color_');
      }).first();
      if (color) {
        color = color.replace('color_', '');
        output.color = color;
      }
      var backgroundColor = style.filter(function (value) {
        return value.startsWith('backgroundColor_');
      }).first();
      if (backgroundColor) {
        backgroundColor = backgroundColor.replace('backgroundColor_', '');
        output.backgroundColor = backgroundColor;
      }
      return output;
    };
    _this.blockStyleFn = function (contentBlock) {
      var data = contentBlock.getData();
      if (data.has('alignment')) {
        return 'align-' + data.get('alignment');
      }
    };
    _this.blockRendererFn = function (contentBlock) {
      var onAudioEdit = function onAudioEdit(key) {
        var editorState = _this.state.editorState;

        var contentState = editorState.getCurrentContent();
        var block = contentState.getBlockForKey(key);
        var entityKey = block.getEntityAt(0);
        var entity = contentState.getEntity(entityKey);
        _this.insertAudio.refs.wrappedComponent.refs.formWrappedComponent.editAudio(entityKey, entity.data);
      };
      var onVideoEdit = function onVideoEdit(key) {
        var editorState = _this.state.editorState;

        var contentState = editorState.getCurrentContent();
        var block = contentState.getBlockForKey(key);
        var entityKey = block.getEntityAt(0);
        var entity = contentState.getEntity(entityKey);
        _this.insertVideo.refs.wrappedComponent.refs.formWrappedComponent.editVideo(entityKey, entity.data);
      };
      var onImageEdit = function onImageEdit(key) {
        var editorState = _this.state.editorState;

        var contentState = editorState.getCurrentContent();
        var block = contentState.getBlockForKey(key);
        var entityKey = block.getEntityAt(0);
        var entity = contentState.getEntity(entityKey);
        _this.insertImage.refs.wrappedComponent.refs.formWrappedComponent.editImage(entityKey, entity.data);
      };
      var onFlashEdit = function onFlashEdit(key) {
        var editorState = _this.state.editorState;

        var contentState = editorState.getCurrentContent();
        var block = contentState.getBlockForKey(key);
        var entityKey = block.getEntityAt(0);
        var entity = contentState.getEntity(entityKey);
        _this.insertFlash.refs.wrappedComponent.refs.formWrappedComponent.editFlash(entityKey, entity.data);
      };
      var onRemove = function onRemove(key) {
        var editorState = _this.state.editorState;

        var contentState = editorState.getCurrentContent();
        var block = contentState.getBlockForKey(key);
        var selection = new _draftJs.SelectionState({
          anchorKey: key,
          anchorOffset: 0,
          focusKey: key,
          focusOffset: block.getLength()
        });
        var newContentState = _draftJs.Modifier.applyEntity(contentState, selection, null);
        var newEditorState = _draftJs.EditorState.push(editorState, newContentState, 'apply-entity');
        _this.onChange(newEditorState);
      };
      if (contentBlock.getType() === 'atomic') {
        return {
          component: _Media2.default,
          editable: false,
          props: {
            onRemove: onRemove,
            onImageEdit: onImageEdit,
            onAudioEdit: onAudioEdit,
            onVideoEdit: onVideoEdit,
            onFlashEdit: onFlashEdit
          }
        };
      }
      return null;
    };
    return _this;
  }

  _createClass(FocusEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // this.editor.focus();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (!this.initialized && newProps.value) {
        this.setState({
          editorState: _draftJs.EditorState.createWithContent(FocusEditor.fromHTML(newProps.value), this.decorator)
        });
        this.initialized = true;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.initialized = false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classNames2.default)('focus-editor', { 'focus-editor-fullscreen': this.state.fullScreen })
        },
        _react2.default.createElement(
          _affix2.default,
          null,
          _react2.default.createElement(
            'div',
            { className: 'focus-editor-toolbar' },
            _react2.default.createElement(
              'div',
              { className: 'focus-editor-controls-container' },
              _react2.default.createElement(_ToolbarButton2.default, {
                label: _react2.default.createElement('i', { className: 'fa fa-arrows-alt' }),
                tooltip: '\u5168\u5C4F',
                onClick: function onClick() {
                  _this2.setState({ fullScreen: !_this2.state.fullScreen });
                },
                active: this.state.fullScreen
              })
            ),
            _react2.default.createElement(_HistoryControls2.default, {
              editorState: this.state.editorState,
              onChange: this.onChange
            }),
            _react2.default.createElement(_HeadingPicker2.default, {
              editorState: this.state.editorState,
              onChange: this.onChange
            }),
            _react2.default.createElement(_FontSizePicker2.default, {
              editorState: this.state.editorState,
              onChange: this.onChange,
              fontSizes: this.fontSizes
            }),
            _react2.default.createElement(_InlineStyleControls2.default, {
              editorState: this.state.editorState,
              onChange: this.onChange
            }),
            _react2.default.createElement(_TextColorPicker2.default, {
              editorState: this.state.editorState,
              onChange: this.onChange,
              colors: this.colors
            }),
            _react2.default.createElement(_BackgroundColorPicker2.default, {
              editorState: this.state.editorState,
              onChange: this.onChange,
              colors: this.colors
            }),
            _react2.default.createElement(_AlignmentControls2.default, {
              editorState: this.state.editorState,
              onChange: this.onChange
            }),
            _react2.default.createElement(_ListControls2.default, {
              editorState: this.state.editorState,
              onChange: this.onChange
            }),
            _react2.default.createElement(_LinkControls2.default, {
              editorState: this.state.editorState,
              onChange: this.onChange
            }),
            _react2.default.createElement(_InsertAudio2.default, {
              ref: function ref(insertAudio) {
                _this2.insertAudio = insertAudio;
              },
              editor: this.editor,
              editorState: this.state.editorState,
              onChange: this.onChange,
              onUpload: this.props.onAudioUpload
            }),
            _react2.default.createElement(_InsertImage2.default, {
              ref: function ref(insertImage) {
                _this2.insertImage = insertImage;
              },
              editor: this.editor,
              editorState: this.state.editorState,
              onChange: this.onChange,
              onUpload: this.props.onImageUpload
            }),
            _react2.default.createElement(_InsertVideo2.default, {
              ref: function ref(insertVideo) {
                _this2.insertVideo = insertVideo;
              },
              editor: this.editor,
              editorState: this.state.editorState,
              onChange: this.onChange,
              onUpload: this.props.onVideoUpload
            }),
            _react2.default.createElement(_InsertFlash2.default, {
              ref: function ref(insertFlash) {
                _this2.insertFlash = insertFlash;
              },
              editor: this.editor,
              editorState: this.state.editorState,
              onChange: this.onChange
            })
          )
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'focus-editor-container',
            onClick: function onClick() {
              _this2.editor.focus();
            }
          },
          _react2.default.createElement(_draftJs.Editor, {
            ref: function ref(editor) {
              _this2.editor = editor;
            },
            editorState: this.state.editorState,
            onChange: this.onChange,
            customStyleMap: this.customStyleMap,
            customStyleFn: this.customStyleFn,
            blockStyleFn: this.blockStyleFn,
            blockRendererFn: this.blockRendererFn
          })
        )
      );
    }
  }]);

  return FocusEditor;
}(_react2.default.Component);

FocusEditor.propTypes = {
  onAudioUpload: _propTypes2.default.func.isRequired,
  onImageUpload: _propTypes2.default.func.isRequired,
  onVideoUpload: _propTypes2.default.func.isRequired,
  onChange: _propTypes2.default.func.isRequired
};
FocusEditor.defaultProps = {
  onAudioUpload: function onAudioUpload() {},
  onImageUpload: function onImageUpload() {},
  onVideoUpload: function onVideoUpload() {},
  onChange: function onChange() {}
};
exports.default = FocusEditor;