'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Audio = require('./Audio');

var _Audio2 = _interopRequireDefault(_Audio);

var _Image = require('./Image');

var _Image2 = _interopRequireDefault(_Image);

var _Video = require('./Video');

var _Video2 = _interopRequireDefault(_Video);

var _Flash = require('./Flash');

var _Flash2 = _interopRequireDefault(_Flash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Media = function Media(props) {
  var entityKey = props.block.getEntityAt(0);
  if (entityKey) {
    var entity = props.contentState.getEntity(entityKey);
    switch (entity.getType()) {
      case 'AUDIO':
        return _react2.default.createElement(_Audio2.default, _extends({}, entity.getData(), {
          onRemove: function onRemove() {
            props.blockProps.onRemove(props.block.key);
          },
          onEdit: function onEdit() {
            props.blockProps.onAudioEdit(props.block.key);
          }
        }));
      case 'IMAGE':
        return _react2.default.createElement(_Image2.default, _extends({}, entity.getData(), {
          onRemove: function onRemove() {
            props.blockProps.onRemove(props.block.key);
          },
          onEdit: function onEdit() {
            props.blockProps.onImageEdit(props.block.key);
          }
        }));
      case 'VIDEO':
        return _react2.default.createElement(_Video2.default, _extends({}, entity.getData(), {
          onRemove: function onRemove() {
            props.blockProps.onRemove(props.block.key);
          },
          onEdit: function onEdit() {
            props.blockProps.onVideoEdit(props.block.key);
          }
        }));
      case 'FLASH':
        return _react2.default.createElement(_Flash2.default, _extends({}, entity.getData(), {
          onRemove: function onRemove() {
            props.blockProps.onRemove(props.block.key);
          },
          onEdit: function onEdit() {
            props.blockProps.onFlashEdit(props.block.key);
          }
        }));
      default:
        return _react2.default.createElement('div', null);
    }
  } else {
    return _react2.default.createElement('div', null);
  }
};
exports.default = Media;