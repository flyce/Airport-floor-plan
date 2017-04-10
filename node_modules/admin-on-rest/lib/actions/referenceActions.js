'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var CRUD_GET_ONE_REFERENCE = exports.CRUD_GET_ONE_REFERENCE = 'CRUD_GET_ONE_REFERENCE';

var crudGetOneReference = exports.crudGetOneReference = function crudGetOneReference(resource, id) {
    return {
        type: CRUD_GET_ONE_REFERENCE,
        payload: { resource: resource, id: id }
    };
};