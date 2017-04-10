'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CheckboxGroupInput = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Labeled = require('./Labeled');

var _Labeled2 = _interopRequireDefault(_Labeled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An Input component for a checkbox group, using an array of objects for the options
 *
 * Pass possible options as an array of objects in the 'choices' attribute.
 *
 * The expected input must be an array of identifiers (e.g. [12, 31]) which correspond to
 * the 'optionValue' of 'choices' attribute objects.
 *
 * By default, the options are built from:
 *  - the 'id' property as the option value,
 *  - the 'name' property an the option text
 * @example
 * const choices = [
 *     { id: 12, name: 'Ray Hakt' },
 *     { id: 31, name: 'Ann Gullar' },
 *     { id: 42, name: 'Sean Phonee' },
 * ];
 * <CheckboxGroupInput source="recipients" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi' },
 *    { _id: 456, full_name: 'Jane Austen' },
 * ];
 * <CheckboxGroupInput source="recipients" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <CheckboxGroupInput source="recipients" choices={choices} optionText={optionRenderer} />
 *
 * `optionText` also accepts a React Element, that will be cloned and receive
 * the related choice as the `record` prop. You can use Field components there.
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const FullNameField = ({ record }) => <span>{record.first_name} {record.last_name}</span>;
 * <CheckboxGroupInput source="recipients" choices={choices} optionText={<FullNameField />}/>
 */
var CheckboxGroupInput = exports.CheckboxGroupInput = function (_Component) {
    (0, _inherits3.default)(CheckboxGroupInput, _Component);

    function CheckboxGroupInput() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, CheckboxGroupInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CheckboxGroupInput.__proto__ || Object.getPrototypeOf(CheckboxGroupInput)).call.apply(_ref, [this].concat(args))), _this), _this.handleCheck = function (event, isChecked) {
            var _this$props$input = _this.props.input,
                value = _this$props$input.value,
                onChange = _this$props$input.onChange;


            if (isChecked) {
                onChange([].concat((0, _toConsumableArray3.default)(value), [event.target.value]));
            } else {
                onChange(value.filter(function (v) {
                    return v != event.target.value;
                }));
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(CheckboxGroupInput, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                choices = _props.choices,
                optionValue = _props.optionValue,
                optionText = _props.optionText,
                label = _props.label,
                resource = _props.resource,
                source = _props.source,
                options = _props.options,
                value = _props.input.value;


            var option = _react2.default.isValidElement(optionText) ? // eslint-disable-line no-nested-ternary
            function (choice) {
                return _react2.default.cloneElement(optionText, { record: choice });
            } : typeof optionText === 'function' ? optionText : function (choice) {
                return choice[optionText];
            };

            return _react2.default.createElement(
                _Labeled2.default,
                { label: label, source: source, resource: resource },
                _react2.default.createElement(
                    'div',
                    null,
                    choices.map(function (choice) {
                        return _react2.default.createElement(_Checkbox2.default, (0, _extends3.default)({
                            key: choice[optionValue],
                            checked: value ? value.find(function (v) {
                                return v == choice[optionValue];
                            }) !== undefined : false,
                            onCheck: _this2.handleCheck,
                            value: choice[optionValue],
                            label: option(choice)
                        }, options));
                    })
                )
            );
        }
    }]);
    return CheckboxGroupInput;
}(_react.Component);

CheckboxGroupInput.propTypes = {
    addField: _react.PropTypes.bool.isRequired,
    choices: _react.PropTypes.arrayOf(_react.PropTypes.object),
    label: _react.PropTypes.string,
    source: _react.PropTypes.string,
    options: _react.PropTypes.object,
    input: _react.PropTypes.shape({
        onChange: _react.PropTypes.func.isRequired
    }),
    optionText: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func, _react.PropTypes.element]).isRequired,
    optionValue: _react.PropTypes.string.isRequired,
    resource: _react.PropTypes.string
};

CheckboxGroupInput.defaultProps = {
    addField: true,
    choices: [],
    options: {},
    optionText: 'name',
    optionValue: 'id'
};

exports.default = CheckboxGroupInput;