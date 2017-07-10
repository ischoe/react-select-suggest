'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _export = require('./export.js');

require('./Demo.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Demo = function (_Component) {
  _inherits(Demo, _Component);

  function Demo(props) {
    _classCallCheck(this, Demo);

    var _this = _possibleConstructorReturn(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

    _this.state = {
      selectedItem: '',
      selectedItemRedux: ''
    };
    _this.showSelected = _this.showSelected.bind(_this);
    _this.showSelectedRedux = _this.showSelectedRedux.bind(_this);
    return _this;
  }

  _createClass(Demo, [{
    key: 'showSelected',
    value: function showSelected(val) {
      this.setState({
        selectedItem: val
      });
    }
  }, {
    key: 'showSelectedRedux',
    value: function showSelectedRedux(val) {
      this.setState({
        selectedItemRedux: val
      });
    }
  }, {
    key: 'render',
    value: function render() {

      var items = [{
        title: '123'
      }, {
        title: 'hi'
      }];

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
            boxHeight: '200',
            onSelectedChanged: this.showSelected })
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'span',
          null,
          'Selected value : ',
          this.state.selectedItem
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'div',
          { className: 'specificWidth specialStyle' },
          _react2.default.createElement(_export.ReactSelectSuggestRedux, {
            namespace: 'reactSelectReducer1',
            placeholder: 'Search...',
            url: 'https://jsonplaceholder.typicode.com/todos',
            showAttr: 'title',
            boxHeight: '300',
            boxWidth: '200',
            freeTextSelection: false,
            items: items,
            onSelectedChanged: this.showSelectedRedux })
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'span',
          null,
          'Selected value : ',
          this.state.selectedItemRedux
        )
      );
    }
  }]);

  return Demo;
}(_react.Component);

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