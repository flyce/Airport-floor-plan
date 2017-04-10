'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Toolbar = require('material-ui/Toolbar');

var _Responsive = require('../layout/Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

var _button = require('../button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    mobileToolbar: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        zIndex: 2
    }
};

var Toolbar = function Toolbar(_ref) {
    var invalid = _ref.invalid;
    return _react2.default.createElement(_Responsive2.default, {
        small: _react2.default.createElement(
            _Toolbar.Toolbar,
            { style: styles.mobileToolbar, noGutter: true },
            _react2.default.createElement(
                _Toolbar.ToolbarGroup,
                null,
                _react2.default.createElement(_button.SaveButton, { invalid: invalid, raised: false })
            )
        ),
        medium: _react2.default.createElement(
            _Toolbar.Toolbar,
            null,
            _react2.default.createElement(
                _Toolbar.ToolbarGroup,
                null,
                _react2.default.createElement(_button.SaveButton, { invalid: invalid })
            )
        )
    });
};

exports.default = Toolbar;
module.exports = exports['default'];