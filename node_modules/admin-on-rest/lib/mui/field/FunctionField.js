'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @example
 * <FunctionField source="last_name" label="Name" render={record => `${record.first_name} ${record.last_name}`} />
 */
var FunctionField = function FunctionField(_ref) {
    var _ref$record = _ref.record,
        record = _ref$record === undefined ? {} : _ref$record,
        source = _ref.source,
        render = _ref.render,
        elStyle = _ref.elStyle;
    return record ? _react2.default.createElement(
        'span',
        { style: elStyle },
        render(record)
    ) : null;
};

FunctionField.propTypes = {
    addLabel: _react.PropTypes.bool,
    elStyle: _react.PropTypes.object,
    label: _react.PropTypes.string,
    render: _react.PropTypes.func.isRequired,
    record: _react.PropTypes.object,
    source: _react.PropTypes.string
};

var PureFunctionField = (0, _pure2.default)(FunctionField);

PureFunctionField.defaultProps = {
    addLabel: true
};

exports.default = PureFunctionField;
module.exports = exports['default'];