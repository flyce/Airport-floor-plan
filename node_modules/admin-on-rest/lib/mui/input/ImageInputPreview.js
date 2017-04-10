'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImageInputPreview = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _colors = require('material-ui/styles/colors');

var _removeCircle = require('material-ui/svg-icons/content/remove-circle');

var _removeCircle2 = _interopRequireDefault(_removeCircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    container: {
        display: 'inline-block',
        position: 'relative'
    },
    removeButton: {
        position: 'absolute',
        top: '0.5rem',
        right: '0.5rem',
        minWidth: '2rem',
        opacity: 0
    },
    removeButtonHovered: {
        opacity: 1
    }
};

var ImageInputPreview = exports.ImageInputPreview = function (_Component) {
    (0, _inherits3.default)(ImageInputPreview, _Component);

    function ImageInputPreview(props) {
        (0, _classCallCheck3.default)(this, ImageInputPreview);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ImageInputPreview.__proto__ || Object.getPrototypeOf(ImageInputPreview)).call(this, props));

        _this.handleMouseOut = function () {
            return _this.setState({ hovered: false });
        };

        _this.handleMouseOver = function () {
            return _this.setState({ hovered: true });
        };

        _this.state = {
            hovered: false
        };
        return _this;
    }

    (0, _createClass3.default)(ImageInputPreview, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                onRemove = _props.onRemove;


            var removeButtonStyle = this.state.hovered ? (0, _extends3.default)({}, styles.removeButton, styles.removeButtonHovered) : styles.removeButton;

            return _react2.default.createElement(
                'div',
                {
                    onMouseOver: this.handleMouseOver,
                    onMouseOut: this.handleMouseOut,
                    style: styles.container
                },
                _react2.default.createElement(_FlatButton2.default, {
                    style: removeButtonStyle,
                    icon: _react2.default.createElement(_removeCircle2.default, { color: _colors.pinkA200 }),
                    onClick: onRemove
                }),
                children
            );
        }
    }]);
    return ImageInputPreview;
}(_react.Component);

ImageInputPreview.propTypes = {
    children: _react.PropTypes.element.isRequired,
    onRemove: _react.PropTypes.func.isRequired
};

exports.default = ImageInputPreview;