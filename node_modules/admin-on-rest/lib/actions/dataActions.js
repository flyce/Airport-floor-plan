'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.crudGetManyReference = exports.CRUD_GET_MANY_REFERENCE_SUCCESS = exports.CRUD_GET_MANY_REFERENCE_FAILURE = exports.CRUD_GET_MANY_REFERENCE_LOADING = exports.CRUD_GET_MANY_REFERENCE = exports.crudGetMatching = exports.CRUD_GET_MATCHING_SUCCESS = exports.CRUD_GET_MATCHING_FAILURE = exports.CRUD_GET_MATCHING_LOADING = exports.CRUD_GET_MATCHING = exports.crudGetMany = exports.CRUD_GET_MANY_SUCCESS = exports.CRUD_GET_MANY_FAILURE = exports.CRUD_GET_MANY_LOADING = exports.CRUD_GET_MANY = exports.crudDelete = exports.CRUD_DELETE_SUCCESS = exports.CRUD_DELETE_FAILURE = exports.CRUD_DELETE_LOADING = exports.CRUD_DELETE = exports.crudUpdate = exports.CRUD_UPDATE_SUCCESS = exports.CRUD_UPDATE_FAILURE = exports.CRUD_UPDATE_LOADING = exports.CRUD_UPDATE = exports.crudCreate = exports.CRUD_CREATE_SUCCESS = exports.CRUD_CREATE_FAILURE = exports.CRUD_CREATE_LOADING = exports.CRUD_CREATE = exports.crudGetOne = exports.CRUD_GET_ONE_SUCCESS = exports.CRUD_GET_ONE_FAILURE = exports.CRUD_GET_ONE_LOADING = exports.CRUD_GET_ONE = exports.crudGetList = exports.CRUD_GET_LIST_SUCCESS = exports.CRUD_GET_LIST_FAILURE = exports.CRUD_GET_LIST_LOADING = exports.CRUD_GET_LIST = undefined;

var _types = require('../rest/types');

var CRUD_GET_LIST = exports.CRUD_GET_LIST = 'CRUD_GET_LIST';
var CRUD_GET_LIST_LOADING = exports.CRUD_GET_LIST_LOADING = 'CRUD_GET_LIST_LOADING';
var CRUD_GET_LIST_FAILURE = exports.CRUD_GET_LIST_FAILURE = 'CRUD_GET_LIST_FAILURE';
var CRUD_GET_LIST_SUCCESS = exports.CRUD_GET_LIST_SUCCESS = 'CRUD_GET_LIST_SUCCESS';

var crudGetList = exports.crudGetList = function crudGetList(resource, pagination, sort, filter) {
    var cancelPrevious = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    return {
        type: CRUD_GET_LIST,
        payload: { pagination: pagination, sort: sort, filter: filter },
        meta: { resource: resource, fetch: _types.GET_LIST, cancelPrevious: cancelPrevious }
    };
};

var CRUD_GET_ONE = exports.CRUD_GET_ONE = 'CRUD_GET_ONE';
var CRUD_GET_ONE_LOADING = exports.CRUD_GET_ONE_LOADING = 'CRUD_GET_ONE_LOADING';
var CRUD_GET_ONE_FAILURE = exports.CRUD_GET_ONE_FAILURE = 'CRUD_GET_ONE_FAILURE';
var CRUD_GET_ONE_SUCCESS = exports.CRUD_GET_ONE_SUCCESS = 'CRUD_GET_ONE_SUCCESS';

var crudGetOne = exports.crudGetOne = function crudGetOne(resource, id, basePath) {
    var cancelPrevious = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    return {
        type: CRUD_GET_ONE,
        payload: { id: id, basePath: basePath },
        meta: { resource: resource, fetch: _types.GET_ONE, cancelPrevious: cancelPrevious }
    };
};

var CRUD_CREATE = exports.CRUD_CREATE = 'CRUD_CREATE';
var CRUD_CREATE_LOADING = exports.CRUD_CREATE_LOADING = 'CRUD_CREATE_LOADING';
var CRUD_CREATE_FAILURE = exports.CRUD_CREATE_FAILURE = 'CRUD_CREATE_FAILURE';
var CRUD_CREATE_SUCCESS = exports.CRUD_CREATE_SUCCESS = 'CRUD_CREATE_SUCCESS';

var crudCreate = exports.crudCreate = function crudCreate(resource, data, basePath) {
    var redirect = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    return {
        type: CRUD_CREATE,
        payload: { data: data, basePath: basePath, redirect: redirect },
        meta: { resource: resource, fetch: _types.CREATE, cancelPrevious: false }
    };
};

var CRUD_UPDATE = exports.CRUD_UPDATE = 'CRUD_UPDATE';
var CRUD_UPDATE_LOADING = exports.CRUD_UPDATE_LOADING = 'CRUD_UPDATE_LOADING';
var CRUD_UPDATE_FAILURE = exports.CRUD_UPDATE_FAILURE = 'CRUD_UPDATE_FAILURE';
var CRUD_UPDATE_SUCCESS = exports.CRUD_UPDATE_SUCCESS = 'CRUD_UPDATE_SUCCESS';

var crudUpdate = exports.crudUpdate = function crudUpdate(resource, id, data, previousData, basePath) {
    var redirect = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    return {
        type: CRUD_UPDATE,
        payload: { id: id, data: data, previousData: previousData, basePath: basePath, redirect: redirect },
        meta: { resource: resource, fetch: _types.UPDATE, cancelPrevious: false }
    };
};

var CRUD_DELETE = exports.CRUD_DELETE = 'CRUD_DELETE';
var CRUD_DELETE_LOADING = exports.CRUD_DELETE_LOADING = 'CRUD_DELETE_LOADING';
var CRUD_DELETE_FAILURE = exports.CRUD_DELETE_FAILURE = 'CRUD_DELETE_FAILURE';
var CRUD_DELETE_SUCCESS = exports.CRUD_DELETE_SUCCESS = 'CRUD_DELETE_SUCCESS';

var crudDelete = exports.crudDelete = function crudDelete(resource, id, basePath) {
    var redirect = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    return {
        type: CRUD_DELETE,
        payload: { id: id, basePath: basePath, redirect: redirect },
        meta: { resource: resource, fetch: _types.DELETE, cancelPrevious: false }
    };
};

var CRUD_GET_MANY = exports.CRUD_GET_MANY = 'CRUD_GET_MANY';
var CRUD_GET_MANY_LOADING = exports.CRUD_GET_MANY_LOADING = 'CRUD_GET_MANY_LOADING';
var CRUD_GET_MANY_FAILURE = exports.CRUD_GET_MANY_FAILURE = 'CRUD_GET_MANY_FAILURE';
var CRUD_GET_MANY_SUCCESS = exports.CRUD_GET_MANY_SUCCESS = 'CRUD_GET_MANY_SUCCESS';

// Reference related actions

var crudGetMany = exports.crudGetMany = function crudGetMany(resource, ids) {
    return {
        type: CRUD_GET_MANY,
        payload: { ids: ids },
        meta: { resource: resource, fetch: _types.GET_MANY, cancelPrevious: false }
    };
};

var CRUD_GET_MATCHING = exports.CRUD_GET_MATCHING = 'CRUD_GET_MATCHING';
var CRUD_GET_MATCHING_LOADING = exports.CRUD_GET_MATCHING_LOADING = 'CRUD_GET_MATCHING_LOADING';
var CRUD_GET_MATCHING_FAILURE = exports.CRUD_GET_MATCHING_FAILURE = 'CRUD_GET_MATCHING_FAILURE';
var CRUD_GET_MATCHING_SUCCESS = exports.CRUD_GET_MATCHING_SUCCESS = 'CRUD_GET_MATCHING_SUCCESS';

var crudGetMatching = exports.crudGetMatching = function crudGetMatching(reference, relatedTo, pagination, sort, filter) {
    return {
        type: CRUD_GET_MATCHING,
        payload: { pagination: pagination, sort: sort, filter: filter },
        meta: { resource: reference, relatedTo: relatedTo, fetch: _types.GET_LIST, cancelPrevious: false }
    };
};

var CRUD_GET_MANY_REFERENCE = exports.CRUD_GET_MANY_REFERENCE = 'CRUD_GET_MANY_REFERENCE';
var CRUD_GET_MANY_REFERENCE_LOADING = exports.CRUD_GET_MANY_REFERENCE_LOADING = 'CRUD_GET_MANY_REFERENCE_LOADING';
var CRUD_GET_MANY_REFERENCE_FAILURE = exports.CRUD_GET_MANY_REFERENCE_FAILURE = 'CRUD_GET_MANY_REFERENCE_FAILURE';
var CRUD_GET_MANY_REFERENCE_SUCCESS = exports.CRUD_GET_MANY_REFERENCE_SUCCESS = 'CRUD_GET_MANY_REFERENCE_SUCCESS';

var crudGetManyReference = exports.crudGetManyReference = function crudGetManyReference(reference, target, id, relatedTo, pagination, sort, filter) {
    return {
        type: CRUD_GET_MANY_REFERENCE,
        payload: { target: target, id: id, pagination: pagination, sort: sort, filter: filter },
        meta: { resource: reference, relatedTo: relatedTo, fetch: _types.GET_MANY_REFERENCE, cancelPrevious: false }
    };
};