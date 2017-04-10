'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = _callee;

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _fetchActions = require('../../actions/fetchActions');

var _notificationActions = require('../../actions/notificationActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [_callee].map(_regenerator2.default.mark);

function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return (0, _effects.takeEvery)(_fetchActions.FETCH_ERROR, _regenerator2.default.mark(function redirectIfNotauthenticated(_ref) {
                        var error = _ref.error;
                        return _regenerator2.default.wrap(function redirectIfNotauthenticated$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        if (!(error.status === 401 || error.status === 403)) {
                                            _context.next = 5;
                                            break;
                                        }

                                        _context.next = 3;
                                        return (0, _effects.put)((0, _notificationActions.hideNotification)());

                                    case 3:
                                        _context.next = 5;
                                        return (0, _effects.put)((0, _reactRouterRedux.push)('/login'));

                                    case 5:
                                    case 'end':
                                        return _context.stop();
                                }
                            }
                        }, redirectIfNotauthenticated, this);
                    }));

                case 2:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked[0], this);
}
module.exports = exports['default'];