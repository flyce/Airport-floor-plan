'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SimpleForm = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _validate = require('../../util/validate');

var _getDefaultValues = require('../form/getDefaultValues');

var _getDefaultValues2 = _interopRequireDefault(_getDefaultValues);

var _FormField = require('./FormField');

var _FormField2 = _interopRequireDefault(_FormField);

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SimpleForm = exports.SimpleForm = function SimpleForm(_ref) {
    var children = _ref.children,
        handleSubmit = _ref.handleSubmit,
        invalid = _ref.invalid,
        record = _ref.record,
        resource = _ref.resource,
        basePath = _ref.basePath;
    return _react2.default.createElement(
        'form',
        { onSubmit: handleSubmit },
        _react2.default.createElement(
            'div',
            { style: { padding: '0 1em 1em 1em' } },
            _react2.default.Children.map(children, function (input) {
                return input && _react2.default.createElement(
                    'div',
                    { key: input.props.source, style: input.props.style },
                    _react2.default.createElement(_FormField2.default, { input: input, resource: resource, record: record, basePath: basePath })
                );
            })
        ),
        _react2.default.createElement(_Toolbar2.default, { invalid: invalid })
    );
};

SimpleForm.propTypes = {
    children: _react.PropTypes.node,
    defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),
    handleSubmit: _react.PropTypes.func,
    invalid: _react.PropTypes.bool,
    record: _react.PropTypes.object,
    resource: _react.PropTypes.string,
    basePath: _react.PropTypes.string,
    validation: _react.PropTypes.func
};

var enhance = (0, _compose2.default)((0, _reactRedux.connect)(function (state, props) {
    return {
        initialValues: (0, _getDefaultValues2.default)(state, props)
    };
}), (0, _reduxForm.reduxForm)({
    form: 'record-form',
    validate: _validate.validateForm,
    enableReinitialize: true
}));

exports.default = enhance(SimpleForm);