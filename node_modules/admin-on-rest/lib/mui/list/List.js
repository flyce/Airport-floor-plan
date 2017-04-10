'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.List = undefined;

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _Card = require('material-ui/Card');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _reduxForm = require('redux-form');

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _queryReducer = require('../../reducer/resource/list/queryReducer');

var _queryReducer2 = _interopRequireDefault(_queryReducer);

var _ViewTitle = require('../layout/ViewTitle');

var _ViewTitle2 = _interopRequireDefault(_ViewTitle);

var _Title = require('../layout/Title');

var _Title2 = _interopRequireDefault(_Title);

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _Actions = require('./Actions');

var _Actions2 = _interopRequireDefault(_Actions);

var _dataActions = require('../../actions/dataActions');

var _listActions = require('../../actions/listActions');

var _translate = require('../../i18n/translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterFormName = 'filterForm';

/**
 * List page component
 *
 * The <List> component renders the list layout (title, buttons, filters, pagination),
 * and fetches the list of records from the REST API.
 * It then delegates the rendering of the list of records to its child component.
 * Usually, it's a <Datagrid>, responsible for displaying a table with one row for each post.
 *
 * In Redux terms, <List> is a connected component, and <Datagrid> is a dumb component.
 *
 * Props:
 *   - title
 *   - perPage
 *   - sort
 *   - filter (the permanent filter to apply to the query)
 *   - actions
 *   - filters (a React Element used to display the filter form)
 *   - pagination
 *
 * @example
 *     const PostFilter = (props) => (
 *         <Filter {...props}>
 *             <TextInput label="Search" source="q" alwaysOn />
 *             <TextInput label="Title" source="title" />
 *         </Filter>
 *     );
 *     export const PostList = (props) => (
 *         <List {...props}
 *             title="List of posts"
 *             sort={{ field: 'published_at' }}
 *             filter={{ is_published: true }}
 *             filters={<PostFilter />}
 *         >
 *             <Datagrid>
 *                 <TextField source="id" />
 *                 <TextField source="title" />
 *                 <EditButton />
 *             </Datagrid>
 *         </List>
 *     );
 */

var List = exports.List = function (_Component) {
    (0, _inherits3.default)(List, _Component);

    function List(props) {
        (0, _classCallCheck3.default)(this, List);

        var _this = (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

        _this.refresh = function (event) {
            event.stopPropagation();
            _this.fullRefresh = true;
            _this.updateData();
        };

        _this.setSort = function (sort) {
            return _this.changeParams({ type: _queryReducer.SET_SORT, payload: sort });
        };

        _this.setPage = function (page) {
            return _this.changeParams({ type: _queryReducer.SET_PAGE, payload: page });
        };

        _this.setFilters = function (filters) {
            return _this.changeParams({ type: _queryReducer.SET_FILTER, payload: filters });
        };

        _this.showFilter = function (filterName, defaultValue) {
            _this.setState((0, _defineProperty3.default)({}, filterName, true));
            if (typeof defaultValue !== 'undefined') {
                _this.props.changeFormValue(filterFormName, filterName, defaultValue);
                _this.setFilters((0, _extends5.default)({}, _this.props.filterValues, (0, _defineProperty3.default)({}, filterName, defaultValue)));
            }
        };

        _this.hideFilter = function (filterName) {
            _this.setState((0, _defineProperty3.default)({}, filterName, false));
            _this.props.changeFormValue(filterFormName, filterName, '');
            _this.setFilters((0, _extends5.default)({}, _this.props.filterValues, (0, _defineProperty3.default)({}, filterName, undefined)));
        };

        _this.debouncedSetFilters = (0, _lodash2.default)(_this.setFilters.bind(_this), 500);
        _this.state = { key: 0 };
        return _this;
    }

    (0, _createClass3.default)(List, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.updateData();
            if (Object.keys(this.props.query).length > 0) {
                this.props.changeListParams(this.props.resource, this.props.query);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.resource !== this.props.resource || nextProps.query.sort !== this.props.query.sort || nextProps.query.order !== this.props.query.order || nextProps.query.page !== this.props.query.page || nextProps.query.filter !== this.props.query.filter) {
                this.updateData(Object.keys(nextProps.query).length > 0 ? nextProps.query : nextProps.params);
            }
            if (nextProps.data !== this.props.data && this.fullRefresh) {
                this.fullRefresh = false;
                this.setState({ key: this.state.key + 1 });
            }
            if (Object.keys(nextProps.filterValues).length === 0 && Object.keys(this.props.filterValues).length === 0) {
                return;
            }
            if (nextProps.filterValues !== this.props.filterValues) {
                var nextFilters = nextProps.filterValues;
                Object.keys(nextFilters).forEach(function (filterName) {
                    if (nextFilters[filterName] === '') {
                        // remove empty filter from query
                        delete nextFilters[filterName];
                    }
                });
                this.debouncedSetFilters(nextFilters);
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            if (nextProps.isLoading === this.props.isLoading && nextProps.width === this.props.width && nextState === this.state) {
                return false;
            }
            return true;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.debouncedSetFilters.cancel();
        }
    }, {
        key: 'getBasePath',
        value: function getBasePath() {
            return this.props.location.pathname;
        }
    }, {
        key: 'getQuery',


        /**
         * Merge list params from 3 different sources:
         *   - the query string
         *   - the params stored in the state (from previous navigation)
         *   - the props passed to the List component
         */
        value: function getQuery() {
            var query = Object.keys(this.props.query).length > 0 ? this.props.query : (0, _extends5.default)({}, this.props.params);
            if (!query.sort) {
                query.sort = this.props.sort.field;
                query.order = this.props.sort.order;
            }
            if (!query.perPage) {
                query.perPage = this.props.perPage;
            }
            return query;
        }
    }, {
        key: 'updateData',
        value: function updateData(query) {
            var params = query || this.getQuery();
            var sort = params.sort,
                order = params.order,
                page = params.page,
                perPage = params.perPage,
                filter = params.filter;

            var permanentFilter = this.props.filter;
            this.props.crudGetList(this.props.resource, { page: page, perPage: perPage }, { field: sort, order: order }, (0, _extends5.default)({}, filter, permanentFilter));
        }
    }, {
        key: 'changeParams',
        value: function changeParams(action) {
            var newParams = (0, _queryReducer2.default)(this.getQuery(), action);
            this.props.push((0, _extends5.default)({}, this.props.location, { query: (0, _extends5.default)({}, newParams, { filter: JSON.stringify(newParams.filter) }) }));
            this.props.changeListParams(this.props.resource, newParams);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                filters = _props.filters,
                _props$pagination = _props.pagination,
                pagination = _props$pagination === undefined ? _react2.default.createElement(_Pagination2.default, null) : _props$pagination,
                _props$actions = _props.actions,
                actions = _props$actions === undefined ? _react2.default.createElement(_Actions2.default, null) : _props$actions,
                resource = _props.resource,
                hasCreate = _props.hasCreate,
                title = _props.title,
                data = _props.data,
                ids = _props.ids,
                total = _props.total,
                children = _props.children,
                isLoading = _props.isLoading,
                translate = _props.translate;
            var key = this.state.key;

            var query = this.getQuery();
            var filterValues = query.filter;
            var basePath = this.getBasePath();

            var resourceName = translate('resources.' + resource + '.name', {
                smart_count: 2,
                _: _inflection2.default.humanize(_inflection2.default.pluralize(resource))
            });
            var defaultTitle = translate('aor.page.list', { name: '' + resourceName });
            var titleElement = _react2.default.createElement(_Title2.default, { title: title, defaultTitle: defaultTitle });

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _Card.Card,
                    { style: { opacity: isLoading ? 0.8 : 1 }, key: key },
                    actions && _react2.default.cloneElement(actions, {
                        resource: resource,
                        filters: filters,
                        filterValues: filterValues,
                        basePath: basePath,
                        hasCreate: hasCreate,
                        displayedFilters: this.state,
                        showFilter: this.showFilter,
                        refresh: this.refresh
                    }),
                    _react2.default.createElement(_ViewTitle2.default, { title: titleElement }),
                    filters && _react2.default.cloneElement(filters, {
                        resource: resource,
                        hideFilter: this.hideFilter,
                        filterValues: filterValues,
                        displayedFilters: this.state,
                        context: 'form'
                    }),
                    _react2.default.cloneElement(children, {
                        resource: resource,
                        ids: ids,
                        data: data,
                        currentSort: { field: query.sort, order: query.order },
                        basePath: basePath,
                        isLoading: isLoading,
                        setSort: this.setSort
                    }),
                    pagination && _react2.default.cloneElement(pagination, {
                        total: total,
                        page: parseInt(query.page, 10),
                        perPage: parseInt(query.perPage, 10),
                        setPage: this.setPage
                    })
                )
            );
        }
    }]);
    return List;
}(_react.Component);

List.propTypes = {
    // the props you can change
    title: _react.PropTypes.any,
    filter: _react.PropTypes.object,
    filters: _react.PropTypes.element,
    pagination: _react.PropTypes.element,
    actions: _react.PropTypes.element,
    perPage: _react.PropTypes.number.isRequired,
    sort: _react.PropTypes.shape({
        field: _react.PropTypes.string,
        order: _react.PropTypes.string
    }),
    children: _react.PropTypes.element.isRequired,
    // the props managed by admin-on-rest
    changeFormValue: _react.PropTypes.func.isRequired,
    changeListParams: _react.PropTypes.func.isRequired,
    crudGetList: _react.PropTypes.func.isRequired,
    data: _react.PropTypes.object, // eslint-disable-line react/forbid-prop-types
    filterValues: _react.PropTypes.object, // eslint-disable-line react/forbid-prop-types
    hasCreate: _react.PropTypes.bool.isRequired,
    hasEdit: _react.PropTypes.bool.isRequired,
    ids: _react.PropTypes.array,
    isLoading: _react.PropTypes.bool.isRequired,
    location: _react.PropTypes.object.isRequired,
    path: _react.PropTypes.string,
    params: _react.PropTypes.object.isRequired,
    push: _react.PropTypes.func.isRequired,
    query: _react.PropTypes.object.isRequired,
    resource: _react.PropTypes.string.isRequired,
    total: _react.PropTypes.number.isRequired,
    translate: _react.PropTypes.func.isRequired
};

List.defaultProps = {
    filter: {},
    filterValues: {},
    perPage: 10,
    sort: {
        field: 'id',
        order: _queryReducer.SORT_DESC
    }
};

function mapStateToProps(state, props) {
    var resourceState = state.admin[props.resource];
    var query = props.location.query;
    if (query.filter && typeof query.filter === 'string') {
        // if the List has no filter component, the filter is always "{}"
        // avoid deserialization and keep identity by using a constant
        query.filter = props.filters ? JSON.parse(query.filter) : resourceState.list.params.filter;
    }

    return {
        query: query,
        params: resourceState.list.params,
        ids: resourceState.list.ids,
        total: resourceState.list.total,
        data: resourceState.data,
        isLoading: state.admin.loading > 0,
        filterValues: props.filters ? (0, _reduxForm.getFormValues)(filterFormName)(state) : resourceState.list.params.filter
    };
}

var enhance = (0, _compose2.default)((0, _reactRedux.connect)(mapStateToProps, {
    crudGetList: _dataActions.crudGetList,
    changeFormValue: _reduxForm.change,
    changeListParams: _listActions.changeListParams,
    push: _reactRouterRedux.push
}), _translate2.default);

exports.default = enhance(List);