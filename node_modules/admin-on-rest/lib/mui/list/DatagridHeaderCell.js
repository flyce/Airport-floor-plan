'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DatagridHeaderCell = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.defaultsdeep');

var _lodash2 = _interopRequireDefault(_lodash);

var _shouldUpdate = require('recompose/shouldUpdate');

var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate);

var _Table = require('material-ui/Table');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _sort = require('material-ui/svg-icons/content/sort');

var _sort2 = _interopRequireDefault(_sort);

var _FieldTitle = require('../../util/FieldTitle');

var _FieldTitle2 = _interopRequireDefault(_FieldTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    sortButton: {
        minWidth: 40
    },
    nonSortableLabel: {
        position: 'relative',
        paddingLeft: 16,
        paddingRight: 16,
        verticalAlign: 'middle',
        letterSpacing: 0,
        textTransform: 'uppercase',
        fontWeight: 500,
        fontSize: 14
    }
};

var DatagridHeaderCell = exports.DatagridHeaderCell = function DatagridHeaderCell(_ref) {
    var field = _ref.field,
        defaultStyle = _ref.defaultStyle,
        currentSort = _ref.currentSort,
        updateSort = _ref.updateSort,
        resource = _ref.resource;

    var style = (0, _lodash2.default)({}, field.props.headerStyle, field.type.defaultProps ? field.type.defaultProps.headerStyle : {}, defaultStyle);
    return _react2.default.createElement(
        _Table.TableHeaderColumn,
        { style: style },
        field.props.sortable !== false && field.props.source ? _react2.default.createElement(_FlatButton2.default, {
            labelPosition: 'before',
            onClick: updateSort,
            'data-sort': field.props.source,
            label: _react2.default.createElement(_FieldTitle2.default, { label: field.props.label, source: field.props.source, resource: resource }),
            icon: field.props.source === currentSort.field ? _react2.default.createElement(_sort2.default, { style: currentSort.order === 'ASC' ? { transform: 'rotate(180deg)' } : {} }) : false,
            style: styles.sortButton
        }) : field.props.label && _react2.default.createElement(
            'span',
            { style: styles.nonSortableLabel },
            _react2.default.createElement(_FieldTitle2.default, { label: field.props.label, source: field.props.source, resource: resource })
        )
    );
};

DatagridHeaderCell.propTypes = {
    field: _react.PropTypes.element,
    defaultStyle: _react.PropTypes.shape({
        th: _react.PropTypes.object,
        'th:first-child': _react.PropTypes.object,
        sortButton: _react.PropTypes.object,
        nonSortableLabel: _react.PropTypes.object
    }),
    currentSort: _react.PropTypes.shape({
        sort: _react.PropTypes.string,
        order: _react.PropTypes.string
    }),
    isSorting: _react.PropTypes.bool,
    sortable: _react.PropTypes.bool,
    resource: _react.PropTypes.string,
    updateSort: _react.PropTypes.func.isRequired
};

exports.default = (0, _shouldUpdate2.default)(function (props, nextProps) {
    return props.isSorting !== nextProps.isSorting || nextProps.isSorting && props.currentSort.order !== nextProps.currentSort.order;
})(DatagridHeaderCell);