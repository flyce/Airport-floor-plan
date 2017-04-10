'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _effects = require('redux-saga/effects');

var _fetchActions = require('../../actions/fetchActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crudFetch = function crudFetch(restClient) {
    var _marked = [handleFetch].map(_regenerator2.default.mark);

    function handleFetch(action) {
        var type, payload, _action$meta, fetchMeta, meta, restType, response;

        return _regenerator2.default.wrap(function handleFetch$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        type = action.type, payload = action.payload, _action$meta = action.meta, fetchMeta = _action$meta.fetch, meta = (0, _objectWithoutProperties3.default)(_action$meta, ['fetch']);
                        restType = fetchMeta;
                        _context.next = 4;
                        return [(0, _effects.put)({ type: type + '_LOADING', payload: payload, meta: meta }), (0, _effects.put)({ type: _fetchActions.FETCH_START })];

                    case 4:
                        response = void 0;
                        _context.prev = 5;
                        _context.next = 8;
                        return (0, _effects.call)(restClient, restType, meta.resource, payload);

                    case 8:
                        response = _context.sent;
                        _context.next = 11;
                        return (0, _effects.put)({
                            type: type + '_SUCCESS',
                            payload: response,
                            requestPayload: payload,
                            meta: (0, _extends3.default)({}, meta, { fetchResponse: restType, fetchStatus: _fetchActions.FETCH_END })
                        });

                    case 11:
                        _context.next = 13;
                        return (0, _effects.put)({ type: _fetchActions.FETCH_END });

                    case 13:
                        _context.next = 21;
                        break;

                    case 15:
                        _context.prev = 15;
                        _context.t0 = _context['catch'](5);
                        _context.next = 19;
                        return (0, _effects.put)({
                            type: type + '_FAILURE',
                            error: _context.t0.message ? _context.t0.message : _context.t0,
                            requestPayload: payload,
                            meta: (0, _extends3.default)({}, meta, { fetchResponse: restType, fetchStatus: _fetchActions.FETCH_ERROR })
                        });

                    case 19:
                        _context.next = 21;
                        return (0, _effects.put)({ type: _fetchActions.FETCH_ERROR, error: _context.t0 });

                    case 21:
                        _context.prev = 21;
                        _context.next = 24;
                        return (0, _effects.cancelled)();

                    case 24:
                        if (!_context.sent) {
                            _context.next = 28;
                            break;
                        }

                        _context.next = 27;
                        return (0, _effects.put)({ type: _fetchActions.FETCH_CANCEL });

                    case 27:
                        return _context.abrupt('return');

                    case 28:
                        return _context.finish(21);

                    case 29:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _marked[0], this, [[5, 15, 21, 29]]);
    }

    return _regenerator2.default.mark(function watchCrudFetch() {
        return _regenerator2.default.wrap(function watchCrudFetch$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return [(0, _effects.takeLatest)(function (action) {
                            return action.meta && action.meta.fetch && action.meta.cancelPrevious;
                        }, handleFetch), (0, _effects.takeEvery)(function (action) {
                            return action.meta && action.meta.fetch && !action.meta.cancelPrevious;
                        }, handleFetch)];

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, watchCrudFetch, this);
    });
};

exports.default = crudFetch;
module.exports = exports['default'];