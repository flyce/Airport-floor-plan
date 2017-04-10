'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fetchActions = require('../actions/fetchActions');

exports.default = function () {
    var previousState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
        case _fetchActions.FETCH_START:
            return previousState + 1;
        case _fetchActions.FETCH_END:
        case _fetchActions.FETCH_ERROR:
        case _fetchActions.FETCH_CANCEL:
            return Math.max(previousState - 1, 0);
        default:
            return previousState;
    }
};

module.exports = exports['default'];