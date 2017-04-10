'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _recompose = require('recompose');

var translate = function translate(BaseComponent) {
    var TranslatedComponent = (0, _recompose.getContext)({
        translate: _react.PropTypes.func.isRequired,
        locale: _react.PropTypes.string.isRequired
    })(BaseComponent);

    TranslatedComponent.defaultProps = BaseComponent.defaultProps;

    return TranslatedComponent;
};

exports.default = translate;
module.exports = exports['default'];