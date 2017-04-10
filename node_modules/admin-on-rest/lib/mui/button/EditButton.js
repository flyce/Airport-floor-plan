'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _shouldUpdate = require('recompose/shouldUpdate');

var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _create = require('material-ui/svg-icons/content/create');

var _create2 = _interopRequireDefault(_create);

var _linkToRecord = require('../../util/linkToRecord');

var _linkToRecord2 = _interopRequireDefault(_linkToRecord);

var _translate = require('../../i18n/translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditButton = function EditButton(_ref) {
    var _ref$basePath = _ref.basePath,
        basePath = _ref$basePath === undefined ? '' : _ref$basePath,
        _ref$label = _ref.label,
        label = _ref$label === undefined ? 'aor.action.edit' : _ref$label,
        _ref$record = _ref.record,
        record = _ref$record === undefined ? {} : _ref$record,
        translate = _ref.translate;
    return _react2.default.createElement(_FlatButton2.default, {
        primary: true,
        label: label && translate(label),
        icon: _react2.default.createElement(_create2.default, null),
        containerElement: _react2.default.createElement(_reactRouter.Link, { to: (0, _linkToRecord2.default)(basePath, record.id) }),
        style: { overflow: 'inherit' }
    });
};

EditButton.propTypes = {
    basePath: _react.PropTypes.string,
    label: _react.PropTypes.string,
    record: _react.PropTypes.object,
    translate: _react.PropTypes.func.isRequired
};

var enhance = (0, _compose2.default)((0, _shouldUpdate2.default)(function (props, nextProps) {
    return props.record && props.record.id !== nextProps.record.id || props.basePath !== nextProps.basePath;
}), _translate2.default);

exports.default = enhance(EditButton);
module.exports = exports['default'];