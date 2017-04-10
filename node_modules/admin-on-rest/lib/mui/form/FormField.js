'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _Labeled = require('../input/Labeled');

var _Labeled2 = _interopRequireDefault(_Labeled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormField = function FormField(_ref) {
    var input = _ref.input,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['input']);
    return input.props.addField ? input.props.addLabel ? _react2.default.createElement(
        _reduxForm.Field,
        (0, _extends3.default)({}, rest, input.props, { name: input.props.source, component: _Labeled2.default, label: input.props.label }),
        input
    ) : _react2.default.createElement(_reduxForm.Field, (0, _extends3.default)({}, rest, input.props, { name: input.props.source, component: input.type })) : input.props.addLabel ? _react2.default.createElement(
        _Labeled2.default,
        (0, _extends3.default)({}, rest, { label: input.props.label, source: input.props.source }),
        input
    ) : typeof input.type === 'string' ? input : _react2.default.cloneElement(input, rest);
};

exports.default = FormField;
module.exports = exports['default'];