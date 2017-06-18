'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _export = require('./export');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Demo = function Demo(_ref) {
    var reactSelectSuggest = _ref.reactSelectSuggest,
        actions = _ref.actions;
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_export.ReactSelectSuggest, {
            placeholder: 'Search...',
            url: 'https://jsonplaceholder.typicode.com/todos',
            showAttr: 'title',
            boxHeight: '200',
            boxWidth: '500',
            reactSelectSuggest: reactSelectSuggest,
            actions: actions })
    );
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        reactSelectSuggest: state.ReactSelectSuggestReducer
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        actions: (0, _redux.bindActionCreators)(_extends({}, _export.ReactSelectSuggestActions), dispatch)
    };
};

Demo.propTypes = {
    actions: _propTypes2.default.object.isRequired,
    reactSelectSuggest: _propTypes2.default.object.isRequired
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Demo);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Demo, 'Demo', 'src/Demo.js');

    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', 'src/Demo.js');

    __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', 'src/Demo.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/Demo.js');
}();

;