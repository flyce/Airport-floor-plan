'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _refresh = require('material-ui/svg-icons/navigation/refresh');

var _refresh2 = _interopRequireDefault(_refresh);

var _translate = require('../../i18n/translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RefreshButton = function RefreshButton(_ref) {
    var _ref$label = _ref.label,
        label = _ref$label === undefined ? 'aor.action.refresh' : _ref$label,
        translate = _ref.translate,
        refresh = _ref.refresh;
    return _react2.default.createElement(_FlatButton2.default, {
        primary: true,
        label: label && translate(label),
        onClick: refresh,
        icon: _react2.default.createElement(_refresh2.default, null)
    });
};

RefreshButton.propTypes = {
    label: _react.PropTypes.string,
    refresh: _react.PropTypes.func.isRequired,
    translate: _react.PropTypes.func.isRequired
};

exports.default = (0, _translate2.default)(RefreshButton);
module.exports = exports['default'];