'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _viewList = require('material-ui/svg-icons/action/view-list');

var _viewList2 = _interopRequireDefault(_viewList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentPropType = _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]);

var Resource = function Resource() {
    return _react2.default.createElement(
        'span',
        null,
        '<Resource> elements are for configuration only and should not be rendered'
    );
};

Resource.propTypes = {
    name: _react.PropTypes.string.isRequired,
    list: componentPropType,
    create: componentPropType,
    edit: componentPropType,
    show: componentPropType,
    remove: componentPropType,
    icon: componentPropType,
    options: _react.PropTypes.object,
    checkCredentials: _react.PropTypes.func
};

Resource.defaultProps = {
    icon: _viewList2.default,
    options: {}
};

exports.default = Resource;
module.exports = exports['default'];