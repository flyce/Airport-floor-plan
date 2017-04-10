'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

var _FieldTitle = require('../../util/FieldTitle');

var _FieldTitle2 = _interopRequireDefault(_FieldTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DisabledInput = function DisabledInput(_ref) {
    var label = _ref.label,
        record = _ref.record,
        resource = _ref.resource,
        source = _ref.source;
    return _react2.default.createElement(_TextField2.default, {
        value: (0, _lodash2.default)(record, source),
        floatingLabelText: _react2.default.createElement(_FieldTitle2.default, { label: label, source: source, resource: resource }),
        disabled: true
    });
};

DisabledInput.propTypes = {
    label: _react.PropTypes.string,
    record: _react.PropTypes.object,
    resource: _react.PropTypes.string,
    source: _react.PropTypes.string
};

exports.default = DisabledInput;
module.exports = exports['default'];