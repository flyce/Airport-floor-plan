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

var _AutoComplete = require('material-ui/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _FieldTitle = require('../../util/FieldTitle');

var _FieldTitle2 = _interopRequireDefault(_FieldTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An Input component for an autocomplete field, using an array of objects for the options
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
 * <AutocompleteInput source="gender" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
 *    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
 * ];
 * <AutocompleteInput source="author_id" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <AutocompleteInput source="author_id" choices={choices} optionText={optionRenderer} />
 *
 * You can customize the `filter` function used to filter the results.
 * By default, it's `AutoComplete.fuzzyFilter`, but you can use any of
 * the functions provided by `AutoComplete`, or a function of your own
 * @see http://www.material-ui.com/#/components/auto-complete
 * @example
 * import { Edit, SimpleForm, AutocompleteInput } from 'admin-on-rest/mui';
 * import AutoComplete from 'material-ui/AutoComplete';
 *
 * export const PostEdit = (props) => (
 *     <Edit {...props}>
 *         <SimpleForm>
 *             <AutocompleteInput source="category" filter={AutoComplete.caseInsensitiveFilter} choices={choices} />
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * The object passed as `options` props is passed to the material-ui <AutoComplete> component
 *
 * @example
 * <AutocompleteInput source="author_id" options={{ fullWidth: true }} />
 */
var AutocompleteInput = function (_Component) {
    (0, _inherits3.default)(AutocompleteInput, _Component);

    function AutocompleteInput() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, AutocompleteInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AutocompleteInput.__proto__ || Object.getPrototypeOf(AutocompleteInput)).call.apply(_ref, [this].concat(args))), _this), _this.handleNewRequest = function (chosenRequest, index) {
            if (index !== -1) {
                var _this$props = _this.props,
                    choices = _this$props.choices,
                    input = _this$props.input,
                    optionValue = _this$props.optionValue;

                input.onChange(choices[index][optionValue]);
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(AutocompleteInput, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                choices = _props.choices,
                elStyle = _props.elStyle,
                filter = _props.filter,
                input = _props.input,
                label = _props.label,
                options = _props.options,
                optionText = _props.optionText,
                optionValue = _props.optionValue,
                setFilter = _props.setFilter,
                source = _props.source,
                _props$meta = _props.meta,
                touched = _props$meta.touched,
                error = _props$meta.error,
                resource = _props.resource;


            var selectedSource = choices.find(function (choice) {
                return choice[optionValue] === input.value;
            });
            var option = typeof optionText === 'function' ? optionText : function (choice) {
                return choice[optionText];
            };
            var dataSource = choices.map(function (choice) {
                return {
                    value: choice[optionValue],
                    text: option(choice)
                };
            });
            return _react2.default.createElement(_AutoComplete2.default, (0, _extends3.default)({
                searchText: selectedSource && option(selectedSource),
                dataSource: dataSource,
                floatingLabelText: _react2.default.createElement(_FieldTitle2.default, { label: label, source: source, resource: resource }),
                filter: filter,
                onNewRequest: this.handleNewRequest,
                onUpdateInput: setFilter,
                openOnFocus: true,
                style: elStyle,
                errorText: touched && error
            }, options));
        }
    }]);
    return AutocompleteInput;
}(_react.Component);

AutocompleteInput.propTypes = {
    addField: _react.PropTypes.bool.isRequired,
    choices: _react.PropTypes.arrayOf(_react.PropTypes.object),
    elStyle: _react.PropTypes.object,
    filter: _react.PropTypes.func.isRequired,
    input: _react.PropTypes.object,
    label: _react.PropTypes.string,
    meta: _react.PropTypes.object,
    options: _react.PropTypes.object,
    optionElement: _react.PropTypes.element,
    optionText: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]).isRequired,
    optionValue: _react.PropTypes.string.isRequired,
    resource: _react.PropTypes.string,
    setFilter: _react.PropTypes.func,
    source: _react.PropTypes.string
};

AutocompleteInput.defaultProps = {
    addField: true,
    choices: [],
    filter: _AutoComplete2.default.fuzzyFilter,
    options: {},
    optionText: 'name',
    optionValue: 'id'
};

exports.default = AutocompleteInput;
module.exports = exports['default'];