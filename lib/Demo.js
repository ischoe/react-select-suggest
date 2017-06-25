'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _export = require('./export.js');

require('./Demo.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Demo = function Demo() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'specificWidth2' },
      _react2.default.createElement(_export.ReactSelectSuggest, {
        placeholder: 'Search...',
        url: 'https://jsonplaceholder.typicode.com/todos',
        showAttr: 'title',
        boxHeight: '200' })
    ),
    _react2.default.createElement('br', null),
    _react2.default.createElement(_export.ReactSelectSuggest, {
      placeholder: 'Search...',
      url: 'https://jsonplaceholder.typicode.com/todos',
      showAttr: 'title',
      boxHeight: '200',
      boxWidth: '500' }),
    _react2.default.createElement('br', null),
    _react2.default.createElement(
      'div',
      { className: 'specificWidth' },
      _react2.default.createElement(_export.ReactSelectSuggestRedux, {
        namespace: 'reactSelectReducer1',
        placeholder: 'Search...',
        url: 'https://jsonplaceholder.typicode.com/todos',
        showAttr: 'title',
        boxHeight: '300' })
    ),
    _react2.default.createElement('br', null),
    _react2.default.createElement(_export.ReactSelectSuggestRedux, {
      namespace: 'reactSelectReducer2',
      placeholder: 'Search...',
      url: 'https://jsonplaceholder.typicode.com/todos',
      showAttr: 'title',
      boxWidth: '400',
      boxHeight: '300' }),
    _react2.default.createElement('br', null),
    _react2.default.createElement(_export.ReactSelectSuggestRedux, {
      placeholder: 'Search...',
      url: 'https://jsonplaceholder.typicode.com/todos',
      showAttr: 'title',
      boxWidth: '600',
      boxHeight: '600' })
  );
};

var _default = Demo;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Demo, 'Demo', 'src/Demo.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/Demo.js');
}();

;