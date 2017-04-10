'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TabbedForm = exports.validateForm = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _Tabs = require('material-ui/Tabs');

var _validate = require('../../util/validate');

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _getDefaultValues = require('../form/getDefaultValues');

var _getDefaultValues2 = _interopRequireDefault(_getDefaultValues);

var _translate = require('../../i18n/translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Validator function for redux-form
 */
var validateForm = exports.validateForm = function validateForm(values, _ref) {
    var children = _ref.children,
        validation = _ref.validation;

    // digging first in `<FormTab>`, then in all children
    var fieldConstraints = _react.Children.toArray(children).map(function (child) {
        return child.props.children;
    }).map(_validate.getFieldConstraints)
    // merge all constraints object into a single object
    .reduce(function (prev, next) {
        return (0, _extends3.default)({}, prev, next);
    }, {});

    return (0, _extends3.default)({}, (0, _validate.getErrorsForForm)(validation, values), (0, _validate.getErrorsForFieldConstraints)(fieldConstraints, values));
};

var TabbedForm = exports.TabbedForm = function (_Component) {
    (0, _inherits3.default)(TabbedForm, _Component);

    function TabbedForm(props) {
        (0, _classCallCheck3.default)(this, TabbedForm);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TabbedForm.__proto__ || Object.getPrototypeOf(TabbedForm)).call(this, props));

        _this.handleChange = function (value) {
            _this.setState({ value: value });
        };

        _this.state = {
            value: 0
        };
        return _this;
    }

    (0, _createClass3.default)(TabbedForm, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                contentContainerStyle = _props.contentContainerStyle,
                handleSubmit = _props.handleSubmit,
                invalid = _props.invalid,
                record = _props.record,
                resource = _props.resource,
                basePath = _props.basePath,
                translate = _props.translate;

            return _react2.default.createElement(
                'form',
                { onSubmit: handleSubmit },
                _react2.default.createElement(
                    'div',
                    { style: { padding: '0 1em 1em 1em' } },
                    _react2.default.createElement(
                        _Tabs.Tabs,
                        { value: this.state.value, onChange: this.handleChange, contentContainerStyle: contentContainerStyle },
                        _react2.default.Children.map(children, function (tab, index) {
                            return _react2.default.createElement(
                                _Tabs.Tab,
                                { key: tab.props.value, label: translate(tab.props.label), value: index, icon: tab.props.icon },
                                _react2.default.cloneElement(tab, { resource: resource, record: record, basePath: basePath })
                            );
                        })
                    )
                ),
                _react2.default.createElement(_Toolbar2.default, { invalid: invalid })
            );
        }
    }]);
    return TabbedForm;
}(_react.Component);

TabbedForm.propTypes = {
    children: _react.PropTypes.node,
    contentContainerStyle: _react.PropTypes.object,
    defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),
    handleSubmit: _react.PropTypes.func,
    invalid: _react.PropTypes.bool,
    record: _react.PropTypes.object,
    resource: _react.PropTypes.string,
    basePath: _react.PropTypes.string,
    translate: _react.PropTypes.func,
    validation: _react.PropTypes.func
};

TabbedForm.defaultProps = {
    contentContainerStyle: { borderTop: 'solid 1px #e0e0e0' }
};

var enhance = (0, _compose2.default)((0, _reactRedux.connect)(function (state, props) {
    return {
        initialValues: (0, _getDefaultValues2.default)(state, props)
    };
}), (0, _reduxForm.reduxForm)({
    form: 'record-form',
    validate: validateForm,
    enableReinitialize: true
}), _translate2.default);

exports.default = enhance(TabbedForm);