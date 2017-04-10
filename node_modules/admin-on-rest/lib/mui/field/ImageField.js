'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImageField = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    container: {
        float: 'left'
    },
    image: {
        maxHeight: '10rem',
        margin: '0.5rem'
    }
};

var ImageField = exports.ImageField = function ImageField(_ref) {
    var _ref$elStyle = _ref.elStyle,
        elStyle = _ref$elStyle === undefined ? {} : _ref$elStyle,
        record = _ref.record,
        source = _ref.source,
        title = _ref.title;

    var style = (0, _extends3.default)({}, styles.container, elStyle);

    var titleValue = (0, _lodash2.default)(record, title) || title;
    var srcValue = (0, _lodash2.default)(record, source);
    if (!srcValue) {
        return _react2.default.createElement('div', null);
    }

    return _react2.default.createElement(
        'div',
        { style: style },
        _react2.default.createElement('img', {
            title: titleValue,
            alt: titleValue,
            src: srcValue,
            style: styles.image
        })
    );
};

ImageField.propTypes = {
    elStyle: _react.PropTypes.object,
    record: _react.PropTypes.object,
    source: _react.PropTypes.string.isRequired,
    title: _react.PropTypes.string
};

exports.default = ImageField;