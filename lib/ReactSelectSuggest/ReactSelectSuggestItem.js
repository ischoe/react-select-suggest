'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactSelectSuggestItem = function ReactSelectSuggestItem(props) {

    var handleItemClick = function handleItemClick(e) {
        props.onHandleItemClick(e);
    };

    var handleItemFocus = function handleItemFocus() {
        props.onHandleItemFocus(props.index);
    };

    var handleMouseMove = function handleMouseMove() {
        props.onHandleMouseMove(props.index);
    };

    var getItemClass = function getItemClass(index) {
        var focusIndex = props.focusIndex,
            focusClass = focusIndex === index ? ' react-select-suggest-focus' : '';


        return index % 2 > 0 ? 'odd' + focusClass : 'even' + focusClass;
    };

    return _react2.default.createElement(
        'li',
        { onMouseDown: handleItemClick,
            onMouseOver: handleItemFocus,
            onMouseMove: handleMouseMove,
            key: props.index,
            className: getItemClass(props.index) },
        props.result[props.showAttr]
    );
};

ReactSelectSuggestItem.propTypes = {
    onHandleItemClick: _propTypes2.default.func.isRequired,
    onHandleItemFocus: _propTypes2.default.func.isRequired,
    onHandleMouseMove: _propTypes2.default.func.isRequired,
    index: _propTypes2.default.number.isRequired,
    result: _propTypes2.default.object.isRequired,
    showAttr: _propTypes2.default.string.isRequired
};

var _default = ReactSelectSuggestItem;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(ReactSelectSuggestItem, 'ReactSelectSuggestItem', 'src/ReactSelectSuggest/ReactSelectSuggestItem.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/ReactSelectSuggest/ReactSelectSuggestItem.js');
}();

;