'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _List = require('material-ui/List');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tertiaryStyle = { float: 'right', opacity: 0.541176 };

var SimpleList = function SimpleList(_ref) {
    var ids = _ref.ids,
        data = _ref.data,
        basePath = _ref.basePath,
        primaryText = _ref.primaryText,
        secondaryText = _ref.secondaryText,
        secondaryTextLines = _ref.secondaryTextLines,
        tertiaryText = _ref.tertiaryText,
        leftAvatar = _ref.leftAvatar,
        leftIcon = _ref.leftIcon,
        rightAvatar = _ref.rightAvatar,
        rightIcon = _ref.rightIcon;
    return _react2.default.createElement(
        _List.List,
        null,
        ids.map(function (id) {
            return _react2.default.createElement(_List.ListItem, {
                key: id,
                primaryText: _react2.default.createElement(
                    'div',
                    null,
                    primaryText(data[id], id),
                    tertiaryText && _react2.default.createElement(
                        'span',
                        { style: tertiaryStyle },
                        tertiaryText(data[id], id)
                    )
                ),
                secondaryText: secondaryText && secondaryText(data[id], id),
                secondaryTextLines: secondaryTextLines,
                leftAvatar: leftAvatar && leftAvatar(data[id], id),
                leftIcon: leftIcon && leftIcon(data[id], id),
                rightAvatar: rightAvatar && rightAvatar(data[id], id),
                rightIcon: rightIcon && rightIcon(data[id], id),
                containerElement: _react2.default.createElement(_reactRouter.Link, { to: basePath + '/' + id })
            });
        })
    );
};

SimpleList.propTypes = {
    ids: _react.PropTypes.array,
    data: _react.PropTypes.object,
    basePath: _react.PropTypes.string,
    primaryText: _react.PropTypes.func,
    secondaryText: _react.PropTypes.func,
    secondaryTextLines: _react.PropTypes.number,
    tertiaryText: _react.PropTypes.func,
    leftAvatar: _react.PropTypes.func,
    leftIcon: _react.PropTypes.func,
    rightAvatar: _react.PropTypes.func,
    rightIcon: _react.PropTypes.func
};

exports.default = SimpleList;
module.exports = exports['default'];