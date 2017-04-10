'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FilterForm = undefined;

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

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _body;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _Card = require('material-ui/Card');

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _highlightOff = require('material-ui/svg-icons/action/highlight-off');

var _highlightOff2 = _interopRequireDefault(_highlightOff);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _translate = require('../../i18n/translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    card: { marginTop: '-14px', paddingTop: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexWrap: 'wrap' },
    body: (_body = { display: 'inline-block' }, (0, _defineProperty3.default)(_body, 'display', 'flex'), (0, _defineProperty3.default)(_body, 'alignItems', 'flex-end'), _body),
    spacer: { width: 48 },
    icon: { color: '#00bcd4', maddingBottom: 0 },
    clearFix: { clear: 'right' }
};

var emptyRecord = {};

var FilterForm = exports.FilterForm = function (_Component) {
    (0, _inherits3.default)(FilterForm, _Component);

    function FilterForm() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, FilterForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FilterForm.__proto__ || Object.getPrototypeOf(FilterForm)).call.apply(_ref, [this].concat(args))), _this), _this.handleHide = function (event) {
            return _this.props.hideFilter(event.currentTarget.dataset.key);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(FilterForm, [{
        key: 'getShownFilters',
        value: function getShownFilters() {
            var _props = this.props,
                filters = _props.filters,
                displayedFilters = _props.displayedFilters,
                initialValues = _props.initialValues;

            return filters.filter(function (filterElement) {
                return filterElement.props.alwaysOn || displayedFilters[filterElement.props.source] || typeof initialValues[filterElement.props.source] !== 'undefined';
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                resource = _props2.resource,
                translate = _props2.translate;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _Card.CardText,
                    { style: styles.card },
                    this.getShownFilters().reverse().map(function (filterElement) {
                        return _react2.default.createElement(
                            'div',
                            { key: filterElement.props.source, style: filterElement.props.style || styles.body },
                            filterElement.props.alwaysOn ? _react2.default.createElement(
                                'div',
                                { style: styles.spacer },
                                '\xA0'
                            ) : _react2.default.createElement(
                                _IconButton2.default,
                                { iconStyle: styles.icon, onTouchTap: _this2.handleHide, 'data-key': filterElement.props.source, tooltip: translate('aor.action.remove_filter') },
                                _react2.default.createElement(_highlightOff2.default, null)
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(_reduxForm.Field, (0, _extends3.default)({
                                    allowEmpty: true
                                }, filterElement.props, {
                                    name: filterElement.props.source,
                                    component: filterElement.type,
                                    resource: resource,
                                    record: emptyRecord
                                }))
                            )
                        );
                    })
                ),
                _react2.default.createElement('div', { style: styles.clearFix })
            );
        }
    }]);
    return FilterForm;
}(_react.Component);

FilterForm.propTypes = {
    resource: _react.PropTypes.string.isRequired,
    filters: _react.PropTypes.arrayOf(_react.PropTypes.node).isRequired,
    displayedFilters: _react.PropTypes.object.isRequired,
    hideFilter: _react.PropTypes.func.isRequired,
    initialValues: _react.PropTypes.object,
    translate: _react.PropTypes.func.isRequired
};

var enhance = (0, _compose2.default)(_translate2.default, (0, _reduxForm.reduxForm)({ form: 'filterForm' }));

exports.default = enhance(FilterForm);