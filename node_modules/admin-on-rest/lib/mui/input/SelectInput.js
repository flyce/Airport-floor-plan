'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _FieldTitle = require('../../util/FieldTitle');

var _FieldTitle2 = _interopRequireDefault(_FieldTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An Input component for a select box, using an array of objects for the options
 *
 * Pass possible options as an array of objects in the 'choices' attribute.
 *
 * By default, the options are built from:
 *  - the 'id' property as the option value,
 *  - the 'name' property an the option text
 * @example
 * const choices = [
 *    { id: 'M', name: 'Male' },
 *    { id: 'F', name: 'Female' },
 * ];
 * <SelectInput source="gender" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
 *    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
 * ];
 * <SelectInput source="author_id" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <SelectInput source="author_id" choices={choices} optionText={optionRenderer} />
 *
 * `optionText` also accepts a React Element, that will be cloned and receive
 * the related choice as the `record` prop. You can use Field components there.
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const FullNameField = ({ record }) => <span>{record.first_name} {record.last_name}</span>;
 * <SelectInput source="gender" choices={choices} optionText={<FullNameField />}/>
 *
 * The object passed as `options` props is passed to the material-ui <SelectField> component
 */
var SelectInput = function (_Component) {
    (0, _inherits3.default)(SelectInput, _Component);

    function SelectInput() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, SelectInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SelectInput.__proto__ || Object.getPrototypeOf(SelectInput)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (event, index, value) {
            return _this.props.input.onChange(value);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(SelectInput, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                allowEmpty = _props.allowEmpty,
                input = _props.input,
                label = _props.label,
                choices = _props.choices,
                optionText = _props.optionText,
                optionValue = _props.optionValue,
                options = _props.options,
                source = _props.source,
                elStyle = _props.elStyle,
                _props$meta = _props.meta,
                touched = _props$meta.touched,
                error = _props$meta.error,
                resource = _props.resource;

            var option = _react2.default.isValidElement(optionText) ? // eslint-disable-line no-nested-ternary
            function (choice) {
                return _react2.default.cloneElement(optionText, { record: choice });
            } : typeof optionText === 'function' ? optionText : function (choice) {
                return choice[optionText];
            };
            return _react2.default.createElement(
                _SelectField2.default,
                (0, _extends3.default)({
                    value: input.value,
                    floatingLabelText: _react2.default.createElement(_FieldTitle2.default, { label: label, source: source, resource: resource }),
                    onChange: this.handleChange,
                    autoWidth: true,
                    style: elStyle,
                    errorText: touched && error
                }, options),
                allowEmpty && _react2.default.createElement(_MenuItem2.default, { value: null, primaryText: '' }),
                choices.map(function (choice) {
                    return _react2.default.createElement(_MenuItem2.default, { key: choice[optionValue], primaryText: option(choice), value: choice[optionValue] });
                })
            );
        }
    }]);
    return SelectInput;
}(_react.Component);

SelectInput.propTypes = {
    addField: _react.PropTypes.bool.isRequired,
    allowEmpty: _react.PropTypes.bool.isRequired,
    choices: _react.PropTypes.arrayOf(_react.PropTypes.object),
    elStyle: _react.PropTypes.object,
    input: _react.PropTypes.object,
    label: _react.PropTypes.string,
    meta: _react.PropTypes.object,
    options: _react.PropTypes.object,
    optionText: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func, _react.PropTypes.element]).isRequired,
    optionValue: _react.PropTypes.string.isRequired,
    resource: _react.PropTypes.string,
    source: _react.PropTypes.string
};

SelectInput.defaultProps = {
    addField: true,
    allowEmpty: false,
    choices: [],
    options: {},
    optionText: 'name',
    optionValue: 'id'
};

exports.default = SelectInput;
module.exports = exports['default'];