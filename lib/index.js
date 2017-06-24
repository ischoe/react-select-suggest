'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactHotLoader = require('react-hot-loader');

var _Demo = require('./Demo');

var _Demo2 = _interopRequireDefault(_Demo);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _export = require('./export');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middleWare = (0, _redux.applyMiddleware)(_reduxThunk2.default);
var reducer = (0, _redux.combineReducers)({ reactSelectReducer: _export.ReactSelectSuggestReducer });
var store = (0, _redux.createStore)(reducer, middleWare);

(0, _reactDom.render)(_react2.default.createElement(
  _reactHotLoader.AppContainer,
  null,
  _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_Demo2.default, null)
  )
), document.getElementById('main-app'));
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(middleWare, 'middleWare', 'src/index.js');

  __REACT_HOT_LOADER__.register(reducer, 'reducer', 'src/index.js');

  __REACT_HOT_LOADER__.register(store, 'store', 'src/index.js');
}();

;