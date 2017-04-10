'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _translate = require('../i18n/translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FieldTitle = function FieldTitle(_ref) {
    var resource = _ref.resource,
        source = _ref.source,
        label = _ref.label,
        translate = _ref.translate;
    return _react2.default.createElement(
        'span',
        null,
        typeof label !== 'undefined' ? translate(label, { _: label }) : typeof source !== 'undefined' ? translate('resources.' + resource + '.fields.' + source, { _: _inflection2.default.humanize(source) }) : ''
    );
};

FieldTitle.propTypes = {
    resource: _react.PropTypes.string,
    source: _react.PropTypes.string,
    label: _react.PropTypes.string,
    translate: _react.PropTypes.func.isRequired
};

FieldTitle.defaultProps = {
    translate: function translate(x) {
        return x;
    }
};

var enhance = (0, _compose2.default)(_pure2.default, _translate2.default);

exports.default = enhance(FieldTitle);
module.exports = exports['default'];