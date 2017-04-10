'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _nodePolyglot = require('node-polyglot');

var _nodePolyglot2 = _interopRequireDefault(_nodePolyglot);

var _reactRedux = require('react-redux');

var _recompose = require('recompose');

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withI18nContext = (0, _recompose.withContext)({
    translate: _react.PropTypes.func.isRequired,
    locale: _react.PropTypes.string.isRequired
}, function (_ref) {
    var locale = _ref.locale,
        _ref$messages = _ref.messages,
        messages = _ref$messages === undefined ? {} : _ref$messages;

    var userMessages = messages[locale] || {};
    var polyglot = new _nodePolyglot2.default({
        locale: locale,
        phrases: (0, _extends3.default)({}, _messages2.default, userMessages)
    });

    return {
        locale: locale,
        translate: polyglot.t.bind(polyglot)
    };
});

var TranslationProvider = function TranslationProvider(_ref2) {
    var children = _ref2.children;
    return _react.Children.only(children);
};

TranslationProvider.propTypes = {
    locale: _react.PropTypes.string.isRequired,
    messages: _react.PropTypes.object,
    children: _react.PropTypes.element
};

var mapStateToProps = function mapStateToProps(state) {
    return { locale: state.locale };
};

exports.default = (0, _recompose.compose)((0, _reactRedux.connect)(mapStateToProps), withI18nContext)(TranslationProvider);
module.exports = exports['default'];