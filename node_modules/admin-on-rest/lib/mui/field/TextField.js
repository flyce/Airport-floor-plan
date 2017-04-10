'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextField = function TextField(_ref) {
    var source = _ref.source,
        _ref$record = _ref.record,
        record = _ref$record === undefined ? {} : _ref$record,
        elStyle = _ref.elStyle;

    return _react2.default.createElement(
        'span',
        { style: elStyle },
        (0, _lodash2.default)(record, source)
    );
};

TextField.propTypes = {
    addLabel: _react.PropTypes.bool,
    elStyle: _react.PropTypes.object,
    label: _react.PropTypes.string,
    record: _react.PropTypes.object,
    source: _react.PropTypes.string.isRequired
};

var PureTextField = (0, _pure2.default)(TextField);

PureTextField.defaultProps = {
    addLabel: true
};

exports.default = PureTextField;
module.exports = exports['default'];