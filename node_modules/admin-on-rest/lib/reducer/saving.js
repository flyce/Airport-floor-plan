'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reduxForm = require('redux-form');

var _reactRouterRedux = require('react-router-redux');

var _actions = require('../actions');

exports.default = function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
        case _reduxForm.actionTypes.TOUCH:
            return true;
        case _reactRouterRedux.LOCATION_CHANGE:
        case _reduxForm.actionTypes.SET_SUBMIT_FAILED:
        case _actions.CRUD_CREATE_FAILURE:
        case _actions.CRUD_UPDATE_FAILURE:
            return false;
        default:
            return previousState;
    }
};

module.exports = exports['default'];