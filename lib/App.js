'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _ReactSelectSuggestActions = require('./components/ReactSelectSuggest/ReactSelectSuggestActions');

var ReactSelectSuggestActions = _interopRequireWildcard(_ReactSelectSuggestActions);

var _ReactSelectSuggest = require('./components/ReactSelectSuggest/ReactSelectSuggest');

var _ReactSelectSuggest2 = _interopRequireDefault(_ReactSelectSuggest);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App(_ref) {
    var reactSelectSuggest = _ref.reactSelectSuggest,
        actions = _ref.actions;
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_ReactSelectSuggest2.default, {
            placeholder: 'Search...',
            url: 'https://jsonplaceholder.typicode.com/posts',
            showAttr: 'title',
            boxHeight: '200',
            boxWidth: '500',
            reactSelectSuggest: reactSelectSuggest,
            actions: actions })
    );
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        reactSelectSuggest: state.reactSelectSuggest
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        actions: (0, _redux.bindActionCreators)(_extends({}, ReactSelectSuggestActions), dispatch)
    };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(App, 'App', 'src/App.js');

    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', 'src/App.js');

    __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', 'src/App.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/App.js');
}();

;