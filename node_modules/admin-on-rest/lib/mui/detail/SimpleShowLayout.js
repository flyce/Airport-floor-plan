'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SimpleShowLayout = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Labeled = require('../input/Labeled');

var _Labeled2 = _interopRequireDefault(_Labeled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SimpleShowLayout = exports.SimpleShowLayout = function SimpleShowLayout(_ref) {
    var basePath = _ref.basePath,
        children = _ref.children,
        record = _ref.record,
        resource = _ref.resource;
    return _react2.default.createElement(
        'div',
        { style: { padding: '0 1em 1em 1em' } },
        _react.Children.map(children, function (field) {
            return _react2.default.createElement(
                'div',
                { key: field.props.source, style: field.props.style },
                field.props.addLabel ? _react2.default.createElement(
                    _Labeled2.default,
                    { record: record, resource: resource, basePath: basePath, label: field.props.label, source: field.props.source, disabled: false },
                    field
                ) : typeof field.type === 'string' ? field : _react2.default.cloneElement(field, { record: record, resource: resource, basePath: basePath })
            );
        })
    );
};

SimpleShowLayout.propTypes = {
    basePath: _react.PropTypes.string,
    children: _react.PropTypes.node,
    record: _react.PropTypes.object,
    resource: _react.PropTypes.string
};

exports.default = SimpleShowLayout;