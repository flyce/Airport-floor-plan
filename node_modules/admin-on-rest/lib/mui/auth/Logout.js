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

var _reactRouterRedux = require('react-router-redux');

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _powerSettingsNew = require('material-ui/svg-icons/action/power-settings-new');

var _powerSettingsNew2 = _interopRequireDefault(_powerSettingsNew);

var _translate = require('../../i18n/translate');

var _translate2 = _interopRequireDefault(_translate);

var _auth = require('../../auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logout = function (_Component) {
    (0, _inherits3.default)(Logout, _Component);

    function Logout() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Logout);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Logout.__proto__ || Object.getPrototypeOf(Logout)).call.apply(_ref, [this].concat(args))), _this), _this.handleLogout = function () {
            var _this$props = _this.props,
                authClient = _this$props.authClient,
                push = _this$props.push;

            authClient(_auth.AUTH_LOGOUT).then(function () {
                return push('/login');
            });
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Logout, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                authClient = _props.authClient,
                translate = _props.translate;

            return authClient ? _react2.default.createElement(_MenuItem2.default, { leftIcon: _react2.default.createElement(_powerSettingsNew2.default, null), primaryText: translate('aor.auth.logout'), onClick: this.handleLogout }) : null;
        }
    }]);
    return Logout;
}(_react.Component);

Logout.propTypes = {
    authClient: _react.PropTypes.func,
    push: _react.PropTypes.func,
    translate: _react.PropTypes.func
};

var enhance = (0, _compose2.default)(_translate2.default, (0, _reactRedux.connect)(null, { push: _reactRouterRedux.push }));

exports.default = enhance(Logout);
module.exports = exports['default'];