'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateForm = exports.getErrorsForFieldConstraints = exports.getErrorsForForm = exports.getFieldConstraints = exports.getConstraintsFunctionFromFunctionOrObject = exports.coreConstraints = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.set');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-underscore-dangle */
/* @link http://stackoverflow.com/questions/46155/validate-email-address-in-javascript */
var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var isEmpty = function isEmpty(value) {
    return typeof value === 'undefined' || value === null || value === '';
};

/* eslint-disable no-confusing-arrow */
var coreConstraints = {
    required: function required(value) {
        return isEmpty(value) ? 'Required field' : null;
    },
    min: function min(value, _, _min) {
        return !isEmpty(value) && (isNaN(parseInt(value, 10)) || parseInt(value, 10) < _min) ? 'Minimum value: ' + _min : null;
    },
    max: function max(value, _, _max) {
        return !isEmpty(value) && (isNaN(parseInt(value, 10)) || parseInt(value, 10) > _max) ? 'Maximum value: ' + _max : null;
    },
    minLength: function minLength(value, _, min) {
        return isEmpty(value) || ('' + value).length < min ? 'Minimum length: ' + min : null;
    },
    maxLength: function maxLength(value, _, max) {
        return !isEmpty(value) && ('' + value).length > max ? 'Maximum length: ' + max : null;
    },
    email: function email(value) {
        return !isEmpty(value) && !EMAIL_REGEX.test(value) ? 'Must be a valid email' : null;
    },
    regex: function regex(value, _, _ref) {
        var pattern = _ref.pattern,
            message = _ref.message;
        return !isEmpty(value) && !pattern.test(value) ? message : null;
    },
    choices: function choices(value, _, _ref2) {
        var list = _ref2.list,
            message = _ref2.message;
        return !isEmpty(value) && list.indexOf(value) === -1 ? message : null;
    },
    custom: function custom(value, values, func) {
        return func(value, values);
    }
};

/**
 * Combine multiple constraints into a single function
 *
 * @param {Object} constraints Constraints object; e.g. { required: true, min: 3 }
 *
 * @return {function} A function (value, values) => [errors]
 */
exports.coreConstraints = coreConstraints;
var getConstraintsFunction = function getConstraintsFunction(constraints) {
    return function (value, values) {
        return Object.keys(constraints).filter(function (constraintName) {
            return coreConstraints[constraintName];
        }).map(function (constraintName) {
            var constraint = coreConstraints[constraintName];
            constraint._name = constraintName; // .name does not exist on IE
            return constraint;
        }).reduce(function (errors, constraint) {
            return [].concat((0, _toConsumableArray3.default)(errors), [constraint(value, values, constraints[constraint.name])]);
        }, []).filter(function (error) {
            return error !== null;
        });
    };
};

var getConstraintsFunctionFromFunctionOrObject = exports.getConstraintsFunctionFromFunctionOrObject = function getConstraintsFunctionFromFunctionOrObject(constraints) {
    if (typeof constraints === 'function') return constraints;
    if (!Array.isArray(constraints) && (typeof constraints === 'undefined' ? 'undefined' : (0, _typeof3.default)(constraints)) === 'object') return getConstraintsFunction(constraints);
    throw new Error('Unsupported validation type');
};

/**
 * @example
 * from the following fields:
 *     <TextField source="title" validation={{ minLength: 5 }} />
 *     <TextField source="age" validation={{ required: true, min: 18 }} />
 * produces the following output
 * {
 *    title: (value) => value.length < 5 ? ['title is too short'] : [],
 *    age:   (value) => {
 *       const errors = [];
 *       if (value) errors.push('age is required');
 *       if (value < 18) errors.push('age is under 18');
 *       return errors;
 *    }
 * }
 */
var getFieldConstraints = exports.getFieldConstraints = function getFieldConstraints(children) {
    return _react2.default.Children.toArray(children).map(function (_ref3) {
        var _ref3$props = _ref3.props,
            fieldName = _ref3$props.source,
            validation = _ref3$props.validation;
        return { fieldName: fieldName, validation: validation };
    }).filter(function (_ref4) {
        var validation = _ref4.validation;
        return !!validation;
    }).reduce(function (constraints, _ref5) {
        var fieldName = _ref5.fieldName,
            validation = _ref5.validation;

        constraints[fieldName] = getConstraintsFunctionFromFunctionOrObject(validation); // eslint-disable-line no-param-reassign
        return constraints;
    }, {});
};

var getErrorsForForm = exports.getErrorsForForm = function getErrorsForForm(validation, values) {
    var errors = typeof validation === 'function' ? validation(values) : {};
    // warn user we expect an object here, in case of validation just returned an error message
    if (errors === null || (typeof errors === 'undefined' ? 'undefined' : (0, _typeof3.default)(errors)) !== 'object') {
        throw new Error('Validation function given to form components should return an object.');
    }
    return errors;
};

var getErrorsForFieldConstraints = exports.getErrorsForFieldConstraints = function getErrorsForFieldConstraints(fieldConstraints, values) {
    var errors = {};
    Object.keys(fieldConstraints).forEach(function (fieldName) {
        var error = fieldConstraints[fieldName]((0, _lodash2.default)(values, fieldName), values);
        if (error.length > 0) {
            if (!(0, _lodash2.default)(errors, fieldName)) {
                (0, _lodash4.default)(errors, fieldName, []);
            }
            (0, _lodash4.default)(errors, fieldName, [].concat((0, _toConsumableArray3.default)((0, _lodash2.default)(errors, fieldName)), (0, _toConsumableArray3.default)(error)));
        }
    });
    return errors;
};

/**
 * Validator function for redux-form
 */
var validateForm = exports.validateForm = function validateForm(values, _ref6) {
    var children = _ref6.children,
        validation = _ref6.validation;
    return (0, _extends3.default)({}, getErrorsForForm(validation, values), getErrorsForFieldConstraints(getFieldConstraints(children), values));
};