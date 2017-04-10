'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReferenceManyField = undefined;

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

var _LinearProgress = require('material-ui/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _dataActions = require('../../actions/dataActions');

var _oneToMany = require('../../reducer/references/oneToMany');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Render related records to the current one.
 *
 * You must define the fields to be passed to the iterator component as children.
 *
 * @example Display all the comments of the current post as a datagrid
 * <ReferenceManyField reference="comments" target="post_id">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="body" />
 *         <DateField source="created_at" />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceManyField>
 *
 * @example Display all the books by the current author, only the title
 * <ReferenceManyField reference="books" target="author_id">
 *     <SingleFieldList>
 *         <ChipField source="title" />
 *     </SingleFieldList>
 * </ReferenceManyField>
 *
 * By default, restricts the possible values to 25. You can extend this limit
 * by setting the `perPage` prop.
 *
 * @example
 * <ReferenceManyField perPage={10} reference="comments" target="post_id">
 *    ...
 * </ReferenceManyField>
 *
 * By default, orders the possible values by id desc. You can change this order
 * by setting the `sort` prop (an object with `field` and `order` properties).
 *
 * @example
 * <ReferenceManyField sort={{ field: 'created_at', order: 'DESC' }} reference="comments" target="post_id">
 *    ...
 * </ReferenceManyField>
 *
 * Also, you can filter the query used to populate the possible values. Use the
 * `filter` prop for that.
 *
 * @example
 * <ReferenceManyField filter={{ is_published: true }} reference="comments" target="post_id">
 *    ...
 * </ReferenceManyField>
 */
var ReferenceManyField = exports.ReferenceManyField = function (_Component) {
    (0, _inherits3.default)(ReferenceManyField, _Component);

    function ReferenceManyField() {
        (0, _classCallCheck3.default)(this, ReferenceManyField);
        return (0, _possibleConstructorReturn3.default)(this, (ReferenceManyField.__proto__ || Object.getPrototypeOf(ReferenceManyField)).apply(this, arguments));
    }

    (0, _createClass3.default)(ReferenceManyField, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchReferences();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.record.id !== nextProps.record.id) {
                this.fetchReferences(nextProps);
            }
        }
    }, {
        key: 'fetchReferences',
        value: function fetchReferences() {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props,
                reference = _ref.reference,
                record = _ref.record,
                resource = _ref.resource,
                target = _ref.target,
                perPage = _ref.perPage,
                sort = _ref.sort,
                filter = _ref.filter;

            var crudGetManyReference = this.props.crudGetManyReference;

            var pagination = { page: 1, perPage: perPage };
            var relatedTo = (0, _oneToMany.nameRelatedTo)(reference, record.id, resource, target);
            crudGetManyReference(reference, target, record.id, relatedTo, pagination, sort, filter);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                resource = _props.resource,
                reference = _props.reference,
                data = _props.data,
                ids = _props.ids,
                children = _props.children,
                basePath = _props.basePath;

            if (_react2.default.Children.count(children) !== 1) {
                throw new Error('<ReferenceManyField> only accepts a single child (like <Datagrid>)');
            }
            if (typeof ids === 'undefined') {
                return _react2.default.createElement(_LinearProgress2.default, { style: { marginTop: '1em' } });
            }
            var referenceBasePath = basePath.replace(resource, reference); // FIXME obviously very weak
            return _react2.default.cloneElement(children, {
                resource: reference,
                ids: ids,
                data: data,
                basePath: referenceBasePath,
                currentSort: {}
            });
        }
    }]);
    return ReferenceManyField;
}(_react.Component);

ReferenceManyField.propTypes = {
    addLabel: _react.PropTypes.bool,
    basePath: _react.PropTypes.string.isRequired,
    children: _react.PropTypes.element.isRequired,
    crudGetManyReference: _react.PropTypes.func.isRequired,
    filter: _react.PropTypes.object,
    ids: _react.PropTypes.array,
    label: _react.PropTypes.string,
    perPage: _react.PropTypes.number,
    record: _react.PropTypes.object,
    reference: _react.PropTypes.string.isRequired,
    data: _react.PropTypes.object,
    resource: _react.PropTypes.string.isRequired,
    sort: _react.PropTypes.shape({
        field: _react.PropTypes.string,
        order: _react.PropTypes.oneOf(['ASC', 'DESC'])
    }),
    source: _react.PropTypes.string.isRequired,
    target: _react.PropTypes.string.isRequired
};

ReferenceManyField.defaultProps = {
    filter: {},
    perPage: 25,
    sort: { field: 'id', order: 'DESC' },
    source: ''
};

function mapStateToProps(state, props) {
    var relatedTo = (0, _oneToMany.nameRelatedTo)(props.reference, props.record.id, props.resource, props.target);
    return {
        data: (0, _oneToMany.getReferences)(state, props.reference, relatedTo),
        ids: (0, _oneToMany.getIds)(state, relatedTo)
    };
}

var ConnectedReferenceManyField = (0, _reactRedux.connect)(mapStateToProps, {
    crudGetManyReference: _dataActions.crudGetManyReference
})(ReferenceManyField);

ConnectedReferenceManyField.defaultProps = {
    addLabel: true,
    source: ''
};

exports.default = ConnectedReferenceManyField;