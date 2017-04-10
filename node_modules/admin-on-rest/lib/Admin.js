'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _reduxForm = require('redux-form');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _effects = require('redux-saga/effects');

var _withProps = require('recompose/withProps');

var _withProps2 = _interopRequireDefault(_withProps);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _locale = require('./reducer/locale');

var _locale2 = _interopRequireDefault(_locale);

var _saga = require('./sideEffect/saga');

var _CrudRoute = require('./CrudRoute');

var _CrudRoute2 = _interopRequireDefault(_CrudRoute);

var _Layout = require('./mui/layout/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _Menu = require('./mui/layout/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Login = require('./mui/auth/Login');

var _Login2 = _interopRequireDefault(_Login);

var _Logout = require('./mui/auth/Logout');

var _Logout2 = _interopRequireDefault(_Logout);

var _TranslationProvider = require('./i18n/TranslationProvider');

var _TranslationProvider2 = _interopRequireDefault(_TranslationProvider);

var _auth = require('./auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Admin = function Admin(_ref) {
    var appLayout = _ref.appLayout,
        authClient = _ref.authClient,
        children = _ref.children,
        _ref$customReducers = _ref.customReducers,
        customReducers = _ref$customReducers === undefined ? {} : _ref$customReducers,
        _ref$customSagas = _ref.customSagas,
        customSagas = _ref$customSagas === undefined ? [] : _ref$customSagas,
        customRoutes = _ref.customRoutes,
        dashboard = _ref.dashboard,
        locale = _ref.locale,
        _ref$messages = _ref.messages,
        messages = _ref$messages === undefined ? {} : _ref$messages,
        menu = _ref.menu,
        restClient = _ref.restClient,
        theme = _ref.theme,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? 'Admin on REST' : _ref$title,
        loginPage = _ref.loginPage,
        logoutButton = _ref.logoutButton;

    var resources = _react2.default.Children.map(children, function (_ref2) {
        var props = _ref2.props;
        return props;
    });
    var reducer = (0, _redux.combineReducers)((0, _extends3.default)({
        admin: (0, _reducer2.default)(resources),
        locale: (0, _locale2.default)(locale),
        form: _reduxForm.reducer,
        routing: _reactRouterRedux.routerReducer
    }, customReducers));
    var saga = _regenerator2.default.mark(function rootSaga() {
        return _regenerator2.default.wrap(function rootSaga$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return [(0, _saga.crudSaga)(restClient)].concat((0, _toConsumableArray3.default)(customSagas)).map(_effects.fork);

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, rootSaga, this);
    });
    var sagaMiddleware = (0, _reduxSaga2.default)();
    var store = (0, _redux.createStore)(reducer, undefined, (0, _redux.compose)((0, _redux.applyMiddleware)(sagaMiddleware, (0, _reactRouterRedux.routerMiddleware)(_reactRouter.hashHistory)), window.devToolsExtension ? window.devToolsExtension() : function (f) {
        return f;
    }));
    sagaMiddleware.run(saga);

    var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.hashHistory, store);
    var firstResource = resources[0].name;
    var onEnter = authClient ? function (params) {
        return function (nextState, replace, callback) {
            return authClient(_auth.AUTH_CHECK, params).then(function () {
                return params && params.scrollToTop ? window.scrollTo(0, 0) : null;
            }).catch(function (e) {
                replace({
                    pathname: e && e.redirectTo || '/login',
                    state: { nextPathname: nextState.location.pathname }
                });
            }).then(callback);
        };
    } : function (params) {
        return function () {
            return params && params.scrollToTop ? window.scrollTo(0, 0) : null;
        };
    };
    var LoginPage = (0, _withProps2.default)({ title: title, theme: theme, authClient: authClient })(loginPage || _Login2.default);
    var LogoutButton = (0, _withProps2.default)({ authClient: authClient })(logoutButton || _Logout2.default);
    var MenuComponent = (0, _withProps2.default)({ authClient: authClient, logout: _react2.default.createElement(LogoutButton, null), resources: resources, hasDashboard: !!dashboard })(menu || _Menu2.default);
    var Layout = (0, _withProps2.default)({
        authClient: authClient,
        logout: _react2.default.createElement(LogoutButton, null),
        menu: _react2.default.createElement(MenuComponent, null),
        title: title,
        theme: theme
    })(appLayout || _Layout2.default);

    return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
            _TranslationProvider2.default,
            { messages: messages },
            _react2.default.createElement(
                _reactRouter.Router,
                { history: history },
                dashboard ? undefined : _react2.default.createElement(_reactRouter.Redirect, { from: '/', to: '/' + firstResource }),
                _react2.default.createElement(_reactRouter.Route, { path: '/login', component: LoginPage }),
                _react2.default.createElement(
                    _reactRouter.Route,
                    { path: '/', component: Layout, resources: resources },
                    customRoutes && customRoutes(),
                    dashboard && _react2.default.createElement(_reactRouter.IndexRoute, { component: dashboard, onEnter: onEnter() }),
                    resources.map(function (resource) {
                        return _react2.default.createElement(_CrudRoute2.default, {
                            key: resource.name,
                            path: resource.name,
                            list: resource.list,
                            create: resource.create,
                            edit: resource.edit,
                            show: resource.show,
                            remove: resource.remove,
                            options: resource.options,
                            onEnter: onEnter
                        });
                    })
                )
            )
        )
    );
};

var componentPropType = _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]);

Admin.propTypes = {
    appLayout: componentPropType,
    authClient: _react.PropTypes.func,
    children: _react.PropTypes.node,
    customSagas: _react.PropTypes.array,
    customReducers: _react.PropTypes.object,
    customRoutes: _react.PropTypes.func,
    dashboard: componentPropType,
    loginPage: componentPropType,
    logoutButton: componentPropType,
    menu: componentPropType,
    restClient: _react.PropTypes.func,
    theme: _react.PropTypes.object,
    title: _react.PropTypes.string,
    locale: _react.PropTypes.string,
    messages: _react.PropTypes.object
};

exports.default = Admin;
module.exports = exports['default'];