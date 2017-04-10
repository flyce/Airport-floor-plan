'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = _callee;

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _referenceActions = require('../../actions/referenceActions');

var _dataActions = require('../../actions/dataActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [fetchReference, accumulate, _callee].map(_regenerator2.default.mark);

/**
 * Example
 *
 * let id = {
 *   posts: { 4: true, 7: true, 345: true },
 *   authors: { 23: true, 47: true, 78: true },
 * }
 */
var ids = {};
var tasks = {};

// see http://yelouafi.github.io/redux-saga/docs/recipes/index.html#debouncing
function fetchReference(resource) {
    return _regenerator2.default.wrap(function fetchReference$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return (0, _effects.call)(_reduxSaga.delay, 50);

                case 2:
                    _context.next = 4;
                    return (0, _effects.put)((0, _dataActions.crudGetMany)(resource, Object.keys(ids[resource])));

                case 4:
                    delete ids[resource];
                    delete tasks[resource];

                case 6:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked[0], this);
}

function accumulate(_ref) {
    var payload = _ref.payload;
    var id, resource;
    return _regenerator2.default.wrap(function accumulate$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    id = payload.id, resource = payload.resource;

                    if (!ids[resource]) {
                        ids[resource] = {};
                    }
                    ids[resource][id] = true; // fast UNIQUE

                    if (!tasks[resource]) {
                        _context2.next = 6;
                        break;
                    }

                    _context2.next = 6;
                    return (0, _effects.cancel)(tasks[resource]);

                case 6:
                    _context2.next = 8;
                    return (0, _effects.fork)(fetchReference, resource);

                case 8:
                    tasks[resource] = _context2.sent;

                case 9:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked[1], this);
}

function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.next = 2;
                    return (0, _effects.takeEvery)(_referenceActions.CRUD_GET_ONE_REFERENCE, accumulate);

                case 2:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _marked[2], this);
}
module.exports = exports['default'];