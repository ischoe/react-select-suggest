'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./ReactSelectSuggest.css');

var _ajaxLoader = require('./ajax-loader.gif');

var _ajaxLoader2 = _interopRequireDefault(_ajaxLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactSelectSuggest = function (_Component) {
    _inherits(ReactSelectSuggest, _Component);

    function ReactSelectSuggest(props) {
        _classCallCheck(this, ReactSelectSuggest);

        return _possibleConstructorReturn(this, (ReactSelectSuggest.__proto__ || Object.getPrototypeOf(ReactSelectSuggest)).call(this, props));
    }

    _createClass(ReactSelectSuggest, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var boxWidth = this.props.boxWidth,
                _refs = this.refs,
                inputField = _refs.inputField,
                mainBox = _refs.mainBox,
                inputOffset = inputField.offsetWidth,
                mainOffset = mainBox.offsetWidth,
                boxWidthValue = parseInt(boxWidth);


            if (boxWidth) {
                if (inputOffset > boxWidthValue) {
                    var offset = inputOffset - boxWidthValue,
                        inputOffsetInPx = boxWidthValue - offset + 'px';

                    inputField.style.width = inputOffsetInPx;
                }
            } else {
                var clientWidth = inputField.clientWidth,
                    offsetWidth = inputField.offsetWidth,
                    _offset = offsetWidth - clientWidth,
                    _inputOffsetInPx = mainOffset - _offset + 'px';

                inputField.style.width = _inputOffsetInPx;
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var reactSelectSuggest = this.props.reactSelectSuggest,
                inputValue = reactSelectSuggest.inputValue;


            if (prevProps.reactSelectSuggest.inputValue !== inputValue) {
                if (inputValue && inputValue.length > 0) {
                    this.props.actions.searchForResults(inputValue, this.buildRequestData());
                } else {
                    this.props.actions.clearSearchResults();
                }
            }
        }
    }, {
        key: 'enableFocus',
        value: function enableFocus() {
            this.props.actions.hidePlaceholder();
            this.props.actions.showDropDown();
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(e) {
            this.enableFocus();
        }
    }, {
        key: 'handleClick',
        value: function handleClick(e) {
            this.enableFocus();
        }
    }, {
        key: 'handleItemClick',
        value: function handleItemClick(e) {
            this.props.actions.selectItem(e.target.innerText);
            this.props.actions.hideDropDown();
        }
    }, {
        key: 'handleSelectedClick',
        value: function handleSelectedClick() {
            this.props.actions.selectItem(false);
            this.props.actions.showDropDown();
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            var reactSelectSuggest = this.props.reactSelectSuggest,
                inputValue = reactSelectSuggest.inputValue,
                selectedItem = reactSelectSuggest.selectedItem;


            if (!inputValue || inputValue.length === 0) {
                this.props.actions.showPlaceholder();
            }
            this.props.actions.hideDropDown();
        }
    }, {
        key: 'buildRequestData',
        value: function buildRequestData() {
            var _props = this.props,
                url = _props.url,
                showAttr = _props.showAttr;

            return {
                url: url,
                showAttr: showAttr
            };
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var innerText = e.target.value;
            this.props.actions.changeInputValue(innerText);
        }
    }, {
        key: 'checkDisplay',
        value: function checkDisplay(valueToCheck) {
            return {
                display: valueToCheck ? 'block' : 'none'
            };
        }
    }, {
        key: 'checkHeight',
        value: function checkHeight(height) {
            return {
                maxHeight: height + 'px'
            };
        }
    }, {
        key: 'checkWidth',
        value: function checkWidth(width) {
            return {
                width: width + 'px'
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                reactSelectSuggest = _props2.reactSelectSuggest,
                placeholder = _props2.placeholder,
                showAttr = _props2.showAttr,
                boxHeight = _props2.boxHeight,
                boxWidth = _props2.boxWidth,
                showPlaceholder = reactSelectSuggest.showPlaceholder,
                inputValue = reactSelectSuggest.inputValue,
                searchResults = reactSelectSuggest.searchResults,
                showDropDown = reactSelectSuggest.showDropDown,
                fetching = reactSelectSuggest.fetching,
                selectedItem = reactSelectSuggest.selectedItem,
                resultAvailable = searchResults && searchResults.length > 0,
                hasSelected = selectedItem && selectedItem.length > 0;


            return _react2.default.createElement(
                'div',
                { ref: 'mainBox', className: 'react-select-suggest', style: this.checkWidth(boxWidth) },
                _react2.default.createElement(
                    'div',
                    { className: 'react-select-suggest-input-main' },
                    _react2.default.createElement(
                        'div',
                        { className: 'react-select-placeholder', style: this.checkDisplay(showPlaceholder) },
                        placeholder
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'react-select-ajax-loader',
                            style: this.checkDisplay(fetching) },
                        _react2.default.createElement('img', { src: _ajaxLoader2.default })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'react-select-selected',
                            style: this.checkDisplay(hasSelected),
                            onClick: this.handleSelectedClick.bind(this) },
                        selectedItem
                    ),
                    _react2.default.createElement('input', { onFocus: this.handleFocus.bind(this),
                        onBlur: this.handleBlur.bind(this),
                        onClick: this.handleClick.bind(this),
                        onChange: this.handleChange.bind(this),
                        style: Object.assign(this.checkDisplay(!hasSelected), this.checkWidth(boxWidth)),
                        ref: 'inputField' })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'react-select-drop-down',
                        style: Object.assign(this.checkDisplay(resultAvailable && showDropDown), this.checkHeight(boxHeight)) },
                    resultAvailable && showDropDown && _react2.default.createElement(
                        'ul',
                        null,
                        searchResults.map(function (result, index) {
                            return _react2.default.createElement(
                                'li',
                                { onMouseDown: _this2.handleItemClick.bind(_this2),
                                    key: index,
                                    className: index % 2 > 0 ? 'odd' : 'even' },
                                result[showAttr]
                            );
                        })
                    )
                ),
                _react2.default.createElement('div', { className: 'react-select-box' })
            );
        }
    }]);

    return ReactSelectSuggest;
}(_react.Component);

ReactSelectSuggest.propTypes = {
    actions: _propTypes2.default.object.isRequired,
    reactSelectSuggest: _propTypes2.default.object.isRequired,
    url: _propTypes2.default.string.isRequired,
    showAttr: _propTypes2.default.string.isRequired
};

var _default = ReactSelectSuggest;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(ReactSelectSuggest, 'ReactSelectSuggest', 'src/components/ReactSelectSuggest/ReactSelectSuggest.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/components/ReactSelectSuggest/ReactSelectSuggest.js');
}();

;