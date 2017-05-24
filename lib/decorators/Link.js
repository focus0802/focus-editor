'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _css = require('antd/lib/tooltip/style/css');

var _tooltip = require('antd/lib/tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

exports.findLinkEntities = findLinkEntities;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = function Link(props) {
  var _props$contentState$g = props.contentState.getEntity(props.entityKey).getData(),
      href = _props$contentState$g.href,
      target = _props$contentState$g.target;

  return _react2.default.createElement(
    _tooltip2.default,
    { overlay: href },
    _react2.default.createElement(
      'a',
      { href: href, target: target },
      props.children
    )
  );
};
exports.default = Link;
function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
}