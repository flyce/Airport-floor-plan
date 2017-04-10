'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _RouteUtils = require('react-router/lib/RouteUtils');

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CrudRoute = function CrudRoute() {
    return _react2.default.createElement(
        'div',
        null,
        '<CrudRoute> elements are for configuration only and should not be rendered'
    );
};

CrudRoute.createRouteFromReactElement = function (element, parentRoute) {
    var _element$props = element.props,
        path = _element$props.path,
        list = _element$props.list,
        create = _element$props.create,
        edit = _element$props.edit,
        show = _element$props.show,
        remove = _element$props.remove,
        options = _element$props.options,
        _element$props$onEnte = _element$props.onEnter,
        onEnter = _element$props$onEnte === undefined ? function () {
        return null;
    } : _element$props$onEnte;

    // dynamically add crud routes

    var crudRoute = (0, _RouteUtils.createRoutesFromReactChildren)(_react2.default.createElement(
        _reactRouter.Route,
        { path: path },
        list && _react2.default.createElement(_reactRouter.IndexRoute, { component: list, onEnter: onEnter({ resource: path, route: 'list' }) }),
        create && _react2.default.createElement(_reactRouter.Route, { path: 'create', component: create, onEnter: onEnter({ resource: path, route: 'create' }) }),
        edit && _react2.default.createElement(_reactRouter.Route, { path: ':id', component: edit, onEnter: onEnter({ resource: path, route: 'edit', scrollToTop: true }) }),
        show && _react2.default.createElement(_reactRouter.Route, { path: ':id/show', component: show, onEnter: onEnter({ resource: path, route: 'show', scrollToTop: true }) }),
        remove && _react2.default.createElement(_reactRouter.Route, { path: ':id/delete', component: remove, onEnter: onEnter({ resource: path, route: 'delete' }) })
    ), parentRoute)[0];
    // higher-order component to pass path as resource to components
    crudRoute.component = (0, _pure2.default)(function (_ref) {
        var children = _ref.children;
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.Children.map(children, function (child) {
                return _react2.default.cloneElement(child, {
                    resource: path,
                    options: options,
                    hasList: !!list,
                    hasEdit: !!edit,
                    hasShow: !!show,
                    hasCreate: !!create,
                    hasDelete: !!remove
                });
            })
        );
    });
    return crudRoute;
};

exports.default = CrudRoute;
module.exports = exports['default'];