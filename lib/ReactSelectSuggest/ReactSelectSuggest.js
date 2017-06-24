'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReactSelectSuggest = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reactRedux = require('react-redux');

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./ReactSelectSuggest.css');

var _ajaxLoader = require('./ajax-loader.gif');

var _ajaxLoader2 = _interopRequireDefault(_ajaxLoader);

var _ReactSelectSuggestActions = require('./ReactSelectSuggestActions');

var ReactSelectSuggestActions = _interopRequireWildcard(_ReactSelectSuggestActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactSelectSuggest = exports.ReactSelectSuggest = function (_Component) {
    _inherits(ReactSelectSuggest, _Component);

    function ReactSelectSuggest(props) {
        _classCallCheck(this, ReactSelectSuggest);

        var _this = _possibleConstructorReturn(this, (ReactSelectSuggest.__proto__ || Object.getPrototypeOf(ReactSelectSuggest)).call(this, props));

        if (!_this.props.reduxComponent) {
            _this.state = {
                showPlaceholder: true,
                inputValue: '',
                fetching: false,
                showDropDown: false,
                searchResults: [],
                error: false,
                selectedItem: ''
            };
        }

        _this.handleSelectedClick = _this.handleSelectedClick.bind(_this);
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleItemClick = _this.handleItemClick.bind(_this);
        return _this;
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
            var _props = this.props,
                reactSelectReducer = _props.reactSelectReducer,
                reduxComponent = _props.reduxComponent,
                _ref = reduxComponent ? reactSelectReducer : this.state,
                inputValue = _ref.inputValue;

            if (reduxComponent) {
                if (prevProps.reactSelectReducer.inputValue !== inputValue) {
                    if (inputValue && inputValue.length > 0) {
                        this.props.actions.searchForResults(inputValue, this.buildRequestData());
                    } else {
                        this.props.actions.clearSearchResults();
                    }
                }
            } else {
                if (prevState.inputValue !== inputValue) {
                    if (inputValue && inputValue.length > 0) {
                        this.setState({
                            fetching: true
                        });
                        this.fetchResults(inputValue, this.buildRequestData());
                    } else {
                        this.setState({
                            searchResults: []
                        });
                    }
                }
            }
        }
    }, {
        key: 'fetchResults',
        value: function fetchResults(inputValue, sendData) {
            var self = this;
            return _axios2.default.get(sendData.url).then(function (result) {
                return result.data;
            }).then(function (data) {
                return data.filter(function (item) {
                    return item[sendData.showAttr].includes(inputValue);
                });
            }).then(function (returnResults) {
                self.setState({
                    fetching: false,
                    searchResults: returnResults
                });
            }).catch(function (error) {
                self.setState({
                    fetching: false,
                    error: error
                });
            });
        }
    }, {
        key: 'enableFocus',
        value: function enableFocus() {
            if (this.props.reduxComponent) {
                this.props.actions.hidePlaceholder();
                this.props.actions.showDropDown();
            } else {
                this.setState({
                    showPlaceholder: false,
                    showDropDown: true
                });
            }
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
            if (this.props.reduxComponent) {
                this.props.actions.selectItem(e.target.innerText);
                this.props.actions.hideDropDown();
            } else {
                this.setState({
                    selectedItem: e.target.innerText,
                    showDropDown: false
                });
            }
        }
    }, {
        key: 'handleSelectedClick',
        value: function handleSelectedClick() {
            if (this.props.reduxComponent) {
                this.props.actions.selectItem(false);
                this.props.actions.showDropDown();
            } else {
                this.setState({
                    selectedItem: false,
                    showDropDown: true
                });
            }
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            var _props2 = this.props,
                reactSelectReducer = _props2.reactSelectReducer,
                reduxComponent = _props2.reduxComponent,
                _ref2 = reduxComponent ? reactSelectReducer : this.state,
                inputValue = _ref2.inputValue,
                selectedItem = _ref2.selectedItem;

            if (!inputValue || inputValue.length === 0) {
                if (reduxComponent) {
                    this.props.actions.showPlaceholder();
                } else {
                    this.setState({
                        showPlaceholder: true
                    });
                }
            }

            if (reduxComponent) {
                this.props.actions.hideDropDown();
            } else {
                this.setState({
                    showDropDown: false
                });
            }
        }
    }, {
        key: 'buildRequestData',
        value: function buildRequestData() {
            var _props3 = this.props,
                url = _props3.url,
                showAttr = _props3.showAttr;

            return {
                url: url,
                showAttr: showAttr
            };
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var innerText = e.target.value;

            if (this.props.reduxComponent) {
                this.props.actions.changeInputValue(innerText);
            } else {
                this.setState({
                    inputValue: innerText
                });
            }
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

            var _props4 = this.props,
                reactSelectReducer = _props4.reactSelectReducer,
                placeholder = _props4.placeholder,
                showAttr = _props4.showAttr,
                boxHeight = _props4.boxHeight,
                boxWidth = _props4.boxWidth,
                reduxComponent = _props4.reduxComponent,
                _ref3 = reduxComponent ? reactSelectReducer : this.state,
                showPlaceholder = _ref3.showPlaceholder,
                inputValue = _ref3.inputValue,
                searchResults = _ref3.searchResults,
                showDropDown = _ref3.showDropDown,
                fetching = _ref3.fetching,
                selectedItem = _ref3.selectedItem,
                error = _ref3.error,
                resultAvailable = searchResults && searchResults.length > 0,
                hasSelected = selectedItem && selectedItem.length > 0,
                errorsAvailable = error !== false;

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
                            onClick: this.handleSelectedClick },
                        selectedItem
                    ),
                    _react2.default.createElement('input', { onFocus: this.handleFocus,
                        onBlur: this.handleBlur,
                        onClick: this.handleClick,
                        onChange: this.handleChange,
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
                                { onMouseDown: _this2.handleItemClick,
                                    key: index,
                                    className: index % 2 > 0 ? 'odd' : 'even' },
                                result[showAttr]
                            );
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'react-select-box-errors', style: this.checkDisplay(errorsAvailable) },
                    errorsAvailable && _react2.default.createElement(
                        'ul',
                        null,
                        _react2.default.createElement(
                            'li',
                            null,
                            error
                        )
                    )
                ),
                _react2.default.createElement('div', { className: 'react-select-box' })
            );
        }
    }]);

    return ReactSelectSuggest;
}(_react.Component);

ReactSelectSuggest.propTypes = {
    url: _propTypes2.default.string.isRequired,
    showAttr: _propTypes2.default.string.isRequired,
    boxWidth: _propTypes2.default.string,
    boxHeight: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    reduxComponent: _propTypes2.default.bool,
    reactSelectReducer: _propTypes2.default.object,
    actions: _propTypes2.default.object
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        reactSelectReducer: state.reactSelectReducer,
        reduxComponent: true
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        actions: (0, _redux.bindActionCreators)(_extends({}, ReactSelectSuggestActions), dispatch)
    };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ReactSelectSuggest);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(ReactSelectSuggest, 'ReactSelectSuggest', 'src/ReactSelectSuggest/ReactSelectSuggest.js');

    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', 'src/ReactSelectSuggest/ReactSelectSuggest.js');

    __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', 'src/ReactSelectSuggest/ReactSelectSuggest.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/ReactSelectSuggest/ReactSelectSuggest.js');
}();

;