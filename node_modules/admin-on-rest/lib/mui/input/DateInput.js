'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.datify = undefined;

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

var _DatePicker = require('material-ui/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _FieldTitle = require('../../util/FieldTitle');

var _FieldTitle2 = _interopRequireDefault(_FieldTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var datify = exports.datify = function datify(input) {
    if (!input) {
        return null;
    }

    var date = input instanceof Date ? input : new Date(input);
    if (isNaN(date)) {
        throw new Error('Invalid date: ' + input);
    }

    return date;
};

var DateInput = function (_Component) {
    (0, _inherits3.default)(DateInput, _Component);

    function DateInput() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, DateInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (_, date) {
            return _this.props.input.onChange(date);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(DateInput, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                input = _props.input,
                label = _props.label,
                _props$meta = _props.meta,
                touched = _props$meta.touched,
                error = _props$meta.error,
                options = _props.options,
                source = _props.source,
                elStyle = _props.elStyle,
                resource = _props.resource;


            return _react2.default.createElement(_DatePicker2.default, (0, _extends3.default)({}, input, {
                errorText: touched && error,
                floatingLabelText: _react2.default.createElement(_FieldTitle2.default, { label: label, source: source, resource: resource }),
                DateTimeFormat: Intl.DateTimeFormat,
                container: 'inline',
                autoOk: true,
                value: datify(input.value),
                onChange: this.onChange,
                style: elStyle
            }, options));
        }
    }]);
    return DateInput;
}(_react.Component);

DateInput.propTypes = {
    addField: _react.PropTypes.bool.isRequired,
    elStyle: _react.PropTypes.object,
    input: _react.PropTypes.object,
    label: _react.PropTypes.string,
    meta: _react.PropTypes.object,
    options: _react.PropTypes.object,
    resource: _react.PropTypes.string,
    source: _react.PropTypes.string
};

DateInput.defaultProps = {
    addField: true,
    options: {}
};

exports.default = DateInput;