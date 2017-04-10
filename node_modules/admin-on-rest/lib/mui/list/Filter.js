'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FilterForm = require('./FilterForm');

var _FilterForm2 = _interopRequireDefault(_FilterForm);

var _FilterButton = require('./FilterButton');

var _FilterButton2 = _interopRequireDefault(_FilterButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Filter = function Filter(_ref) {
    var resource = _ref.resource,
        context = _ref.context,
        children = _ref.children,
        showFilter = _ref.showFilter,
        hideFilter = _ref.hideFilter,
        displayedFilters = _ref.displayedFilters,
        filterValues = _ref.filterValues;
    return context === 'form' ? _react2.default.createElement(_FilterForm2.default, {
        resource: resource,
        filters: _react2.default.Children.toArray(children),
        hideFilter: hideFilter,
        displayedFilters: displayedFilters,
        initialValues: filterValues
    }) : _react2.default.createElement(_FilterButton2.default, {
        resource: resource,
        filters: _react2.default.Children.toArray(children),
        showFilter: showFilter,
        displayedFilters: displayedFilters,
        filterValues: filterValues
    });
};

Filter.propTypes = {
    children: _react.PropTypes.node,
    resource: _react.PropTypes.string.isRequired,
    context: _react2.default.PropTypes.oneOf(['form', 'button']),
    showFilter: _react2.default.PropTypes.func,
    hideFilter: _react2.default.PropTypes.func,
    displayedFilters: _react.PropTypes.object,
    filterValues: _react.PropTypes.object
};

exports.default = Filter;
module.exports = exports['default'];