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

var _RadioButton = require('material-ui/RadioButton');

var _Labeled = require('./Labeled');

var _Labeled2 = _interopRequireDefault(_Labeled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An Input component for a radio button group, using an array of objects for the options
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
 * <RadioButtonGroupInput source="gender" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
 *    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
 * ];
 * <RadioButtonGroupInput source="author_id" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <RadioButtonGroupInput source="author_id" choices={choices} optionText={optionRenderer} />
 *
 * `optionText` also accepts a React Element, that will be cloned and receive
 * the related choice as the `record` prop. You can use Field components there.
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const FullNameField = ({ record }) => <span>{record.first_name} {record.last_name}</span>;
 * <RadioButtonGroupInput source="gender" choices={choices} optionText={<FullNameField />}/>
 *
 * The object passed as `options` props is passed to the material-ui <RadioButtonGroup> component
 */
var RadioButtonGroupInput = function (_Component) {
    (0, _inherits3.default)(RadioButtonGroupInput, _Component);

    function RadioButtonGroupInput() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, RadioButtonGroupInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RadioButtonGroupInput.__proto__ || Object.getPrototypeOf(RadioButtonGroupInput)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (event, value) {
            _this.props.input.onChange(value);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(RadioButtonGroupInput, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                label = _props.label,
                source = _props.source,
                input = _props.input,
                choices = _props.choices,
                optionText = _props.optionText,
                optionValue = _props.optionValue,
                options = _props.options,
                elStyle = _props.elStyle;

            var option = _react2.default.isValidElement(optionText) ? // eslint-disable-line no-nested-ternary
            function (choice) {
                return _react2.default.cloneElement(optionText, { record: choice });
            } : typeof optionText === 'function' ? optionText : function (choice) {
                return choice[optionText];
            };
            return _react2.default.createElement(
                _Labeled2.default,
                { label: label, onChange: this.handleChange, source: source },
                _react2.default.createElement(
                    _RadioButton.RadioButtonGroup,
                    (0, _extends3.default)({
                        name: source,
                        defaultSelected: input.value,
                        style: elStyle
                    }, options),
                    choices.map(function (choice) {
                        return _react2.default.createElement(_RadioButton.RadioButton, { key: choice[optionValue], label: option(choice), value: choice[optionValue] });
                    })
                )
            );
        }
    }]);
    return RadioButtonGroupInput;
}(_react.Component);

RadioButtonGroupInput.propTypes = {
    addField: _react.PropTypes.bool.isRequired,
    choices: _react.PropTypes.arrayOf(_react.PropTypes.object),
    label: _react.PropTypes.string,
    onChange: _react.PropTypes.func,
    options: _react.PropTypes.object,
    optionText: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func, _react.PropTypes.element]).isRequired,
    optionValue: _react.PropTypes.string.isRequired,
    source: _react.PropTypes.string,
    style: _react.PropTypes.object
};

RadioButtonGroupInput.defaultProps = {
    addField: true,
    choices: [],
    options: {},
    optionText: 'name',
    optionValue: 'id'
};

exports.default = RadioButtonGroupInput;
module.exports = exports['default'];