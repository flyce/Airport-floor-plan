'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _reactRedux = require('react-redux');

var _Card = require('material-ui/Card');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _ViewTitle = require('../layout/ViewTitle');

var _ViewTitle2 = _interopRequireDefault(_ViewTitle);

var _Title = require('../layout/Title');

var _Title2 = _interopRequireDefault(_Title);

var _dataActions = require('../../actions/dataActions');

var _CreateActions = require('./CreateActions');

var _CreateActions2 = _interopRequireDefault(_CreateActions);

var _translate = require('../../i18n/translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Create = function (_Component) {
    (0, _inherits3.default)(Create, _Component);

    function Create() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Create);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Create.__proto__ || Object.getPrototypeOf(Create)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmit = function (record) {
            return _this.props.crudCreate(_this.props.resource, record, _this.getBasePath());
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Create, [{
        key: 'getBasePath',
        value: function getBasePath() {
            var location = this.props.location;

            return location.pathname.split('/').slice(0, -1).join('/');
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$actions = _props.actions,
                actions = _props$actions === undefined ? _react2.default.createElement(_CreateActions2.default, null) : _props$actions,
                children = _props.children,
                isLoading = _props.isLoading,
                resource = _props.resource,
                title = _props.title,
                translate = _props.translate;

            var basePath = this.getBasePath();

            var resourceName = translate('resources.' + resource + '.name', {
                smart_count: 1,
                _: _inflection2.default.humanize(_inflection2.default.singularize(resource))
            });
            var defaultTitle = translate('aor.page.create', {
                name: '' + resourceName
            });
            var titleElement = _react2.default.createElement(_Title2.default, { title: title, defaultTitle: defaultTitle });

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _Card.Card,
                    { style: { opacity: isLoading ? 0.8 : 1 } },
                    actions && _react2.default.cloneElement(actions, {
                        basePath: basePath,
                        resource: resource
                    }),
                    _react2.default.createElement(_ViewTitle2.default, { title: titleElement }),
                    _react2.default.cloneElement(children, {
                        onSubmit: this.handleSubmit,
                        resource: resource,
                        basePath: basePath,
                        record: {}
                    })
                )
            );
        }
    }]);
    return Create;
}(_react.Component);

Create.propTypes = {
    actions: _react.PropTypes.element,
    children: _react.PropTypes.element,
    crudCreate: _react.PropTypes.func.isRequired,
    isLoading: _react.PropTypes.bool.isRequired,
    location: _react.PropTypes.object.isRequired,
    params: _react.PropTypes.object.isRequired,
    resource: _react.PropTypes.string.isRequired,
    title: _react.PropTypes.any,
    translate: _react.PropTypes.func.isRequired
};

Create.defaultProps = {
    data: {}
};

function mapStateToProps(state) {
    return {
        isLoading: state.admin.loading > 0
    };
}

var enhance = (0, _compose2.default)((0, _reactRedux.connect)(mapStateToProps, { crudCreate: _dataActions.crudCreate }), _translate2.default);

exports.default = enhance(Create);
module.exports = exports['default'];