'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactHotLoader = require('react-hot-loader');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _ReactSelectSuggestReducer = require('./components/ReactSelectSuggest/ReactSelectSuggestReducer');

var ReactSelectSuggestReducer = _interopRequireWildcard(_ReactSelectSuggestReducer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = (0, _redux.combineReducers)(ReactSelectSuggestReducer);
var store = (0, _redux.createStore)(reducer);

(0, _reactDom.render)(_react2.default.createElement(
  _reactHotLoader.AppContainer,
  null,
  _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_App2.default, null)
  )
), document.getElementById('main-app'));

if (module.hot) {
  module.hot.accept('./App', function () {
    var NextApp = require('./App').default;
    (0, _reactDom.render)(_react2.default.createElement(
      _reactHotLoader.AppContainer,
      null,
      _react2.default.createElement(NextApp, null)
    ), document.getElementById('main-app'));
  });
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(reducer, 'reducer', 'src/index.js');

  __REACT_HOT_LOADER__.register(store, 'store', 'src/index.js');
}();

;