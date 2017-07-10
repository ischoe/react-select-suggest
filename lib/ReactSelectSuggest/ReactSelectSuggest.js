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

require('./ReactSelectSuggestBasic.css');

var _ajaxLoader = require('./ajax-loader.gif');

var _ajaxLoader2 = _interopRequireDefault(_ajaxLoader);

var _ReactSelectSuggestActions = require('./ReactSelectSuggestActions');

var ReactSelectSuggestActions = _interopRequireWildcard(_ReactSelectSuggestActions);

var _ReactSelectInitialState = require('./ReactSelectInitialState');

var _ReactSelectInitialState2 = _interopRequireDefault(_ReactSelectInitialState);

var _ReactSelectSuggestItem = require('./ReactSelectSuggestItem');

var _ReactSelectSuggestItem2 = _interopRequireDefault(_ReactSelectSuggestItem);

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
            _this.state = _ReactSelectInitialState2.default;
        }

        _this.handleSelectedClick = _this.handleSelectedClick.bind(_this);
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleItemClick = _this.handleItemClick.bind(_this);
        _this.handleMouseOverItem = _this.handleMouseOverItem.bind(_this);
        _this.handleKeyDown = _this.handleKeyDown.bind(_this);
        _this.handleMouseMove = _this.handleMouseMove.bind(_this);
        _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
        _this.handleClickArrow = _this.handleClickArrow.bind(_this);
        _this.handleClear = _this.handleClear.bind(_this);
        _this.mouseMoveCounter = 0;
        _this.inputFieldSelectedAfterReopen = false;
        return _this;
    }

    _createClass(ReactSelectSuggest, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (typeof this.props.items !== 'undefined') {
                this.setStateOrReduxAction({ searchResults: this.props.items });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _refs = this.refs,
                inputField = _refs.inputField,
                mainBox = _refs.mainBox,
                inputOffset = inputField.offsetWidth,
                mainOffset = mainBox.offsetWidth;


            this.resizeInputWidth(inputOffset, mainOffset);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var _props = this.props,
                reduxComponent = _props.reduxComponent,
                freeTextSelection = _props.freeTextSelection,
                items = _props.items,
                showAttr = _props.showAttr,
                _getFromStateOrReduxP = this.getFromStateOrReduxProps(),
                inputValue = _getFromStateOrReduxP.inputValue,
                selectedItem = _getFromStateOrReduxP.selectedItem,
                showDropDown = _getFromStateOrReduxP.showDropDown,
                resetSelected = _getFromStateOrReduxP.resetSelected,
                focusIndex = _getFromStateOrReduxP.focusIndex,
                _refs2 = this.refs,
                inputField = _refs2.inputField,
                dropDown = _refs2.dropDown,
                prevInput = reduxComponent ? prevProps.reactSelectReducer.inputValue : prevState.inputValue;

            if (typeof items === 'undefined') {
                this.searchForResults(inputValue, prevInput);
            }

            if (showDropDown && dropDown.offsetWidth > 0) {
                var offset = inputField.offsetWidth - dropDown.offsetWidth;
                if (offset > 0) {
                    dropDown.style.width = parseInt(dropDown.style.width) + offset + 'px';
                }
            }

            if (this.inputFieldSelectedAfterReopen) {
                inputField.select();
                this.inputFieldSelectedAfterReopen = false;
            }

            if (focusIndex !== false && this.mouseMoveCounter === 0) {
                var prevFocusIndex = reduxComponent ? prevProps.reactSelectReducer.focusIndex : prevState.focusIndex;

                if (prevFocusIndex !== focusIndex) {
                    var focusElementTop = dropDown.getElementsByClassName('react-select-suggest-focus')[0];
                    if (focusElementTop && focusElementTop.offsetTop > dropDown.offsetHeight / 2) {
                        dropDown.scrollTop = focusElementTop.offsetTop - dropDown.offsetHeight / 2;
                    }
                }
            }
        }
    }, {
        key: 'searchForResults',
        value: function searchForResults(inputValue, prevInput) {
            var _props2 = this.props,
                reduxComponent = _props2.reduxComponent,
                namespace = _props2.namespace,
                actions = _props2.actions;

            if (reduxComponent) {
                if (prevInput !== inputValue) {
                    if (inputValue && inputValue.length > 0) {
                        actions.searchForResults(namespace, inputValue, this.buildRequestData());
                    } else {
                        actions.clearSearchResults(namespace);
                    }
                }
            } else {
                if (prevInput !== inputValue) {
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
        key: 'resizeInputWidth',
        value: function resizeInputWidth(inputOffset, mainOffset) {
            var boxWidth = this.props.boxWidth,
                _refs3 = this.refs,
                inputField = _refs3.inputField,
                dropDown = _refs3.dropDown,
                boxWidthValue = parseInt(boxWidth);


            if (boxWidth) {
                inputField.style.width = boxWidthValue + 'px';
                dropDown.style.width = boxWidthValue + 'px';

                if (inputField.offsetWidth > boxWidthValue) {
                    this.checkWidthAfterResize(boxWidthValue, inputField, dropDown);
                }
            } else {
                inputField.style.width = mainOffset + 'px';
                dropDown.style.width = mainOffset + 'px';
                if (inputField.offsetWidth > mainOffset) {
                    this.checkWidthAfterResize(mainOffset, inputField, dropDown);
                }
            }
        }
    }, {
        key: 'checkWidthAfterResize',
        value: function checkWidthAfterResize(mainWidth, inputField, dropDown) {
            var offset = inputField.offsetWidth - mainWidth;
            inputField.style.width = parseInt(inputField.style.width) - offset + 'px';
            dropDown.style.width = parseInt(inputField.style.width) - offset + 'px';
        }
    }, {
        key: 'getFromStateOrReduxProps',
        value: function getFromStateOrReduxProps() {
            var _props3 = this.props,
                reactSelectReducer = _props3.reactSelectReducer,
                reduxComponent = _props3.reduxComponent;

            return reduxComponent ? reactSelectReducer : this.state;
        }
    }, {
        key: 'setStateOrReduxAction',
        value: function setStateOrReduxAction(state) {
            var _props4 = this.props,
                reduxComponent = _props4.reduxComponent,
                namespace = _props4.namespace,
                actions = _props4.actions;

            if (reduxComponent) {
                var focusIndex = state.focusIndex,
                    showPlaceholder = state.showPlaceholder,
                    showDropDown = state.showDropDown,
                    selectedItem = state.selectedItem,
                    inputValue = state.inputValue,
                    searchResults = state.searchResults;

                if (typeof focusIndex !== 'undefined') actions.setFocusIndex(namespace, focusIndex);
                if (typeof showPlaceholder !== 'undefined' && showPlaceholder === false) actions.hidePlaceholder(namespace);
                if (typeof showPlaceholder !== 'undefined' && showPlaceholder === true) actions.showPlaceholder(namespace);
                if (typeof showDropDown !== 'undefined' && showDropDown === true) actions.showDropDown(namespace);
                if (typeof showDropDown !== 'undefined' && showDropDown === false) actions.hideDropDown(namespace);
                if (typeof selectedItem !== 'undefined') actions.selectItem(namespace, selectedItem);
                if (typeof inputValue !== 'undefined') actions.changeInputValue(namespace, inputValue);
                if (typeof searchResults !== 'undefined') actions.searchResultsSuccess(namespace, searchResults);
            } else {
                this.setState(_extends({}, state));
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
                    error: error.message
                });
            });
        }
    }, {
        key: 'enableFocus',
        value: function enableFocus() {
            this.setStateOrReduxAction({ showPlaceholder: false, showDropDown: true });
        }
    }, {
        key: 'closeDropDown',
        value: function closeDropDown() {
            var _props5 = this.props,
                reduxComponent = _props5.reduxComponent,
                freeTextSelection = _props5.freeTextSelection,
                _getFromStateOrReduxP2 = this.getFromStateOrReduxProps(),
                inputValue = _getFromStateOrReduxP2.inputValue,
                selectedItem = _getFromStateOrReduxP2.selectedItem,
                showDropDown = _getFromStateOrReduxP2.showDropDown;

            if (showDropDown !== false) {
                if (inputValue.length === 0) {
                    if (selectedItem) {
                        this.selectItem(selectedItem);
                    } else {
                        this.selectItem(false);
                    }
                } else {
                    if (freeTextSelection === false) {
                        if (selectedItem) {
                            this.selectItem(selectedItem);
                        } else {
                            this.selectItem(false);
                        }
                    } else {
                        if (selectedItem) {
                            this.selectItem(selectedItem);
                        } else {
                            this.selectItem(inputValue);
                        }
                    }
                }
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
        key: 'handleClear',
        value: function handleClear() {
            this.selectItem(false);
        }
    }, {
        key: 'handleClickArrow',
        value: function handleClickArrow() {
            var inputField = this.refs.inputField,
                _getFromStateOrReduxP3 = this.getFromStateOrReduxProps(),
                showDropDown = _getFromStateOrReduxP3.showDropDown;

            if (showDropDown) {
                this.closeDropDown();
            } else {
                this.enableFocus();
                this.inputFieldSelectedAfterReopen = true;
            }
        }
    }, {
        key: 'handleMouseLeave',
        value: function handleMouseLeave() {
            var _getFromStateOrReduxP4 = this.getFromStateOrReduxProps(),
                showDropDown = _getFromStateOrReduxP4.showDropDown;

            if (showDropDown === true) {
                this.setStateOrReduxAction({ focusIndex: false });
            }
        }
    }, {
        key: 'selectedItemChanged',
        value: function selectedItemChanged(val) {
            var onSelectedChanged = this.props.onSelectedChanged;

            if (onSelectedChanged) {
                onSelectedChanged(val);
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            var keyCode = e.keyCode,
                _props6 = this.props,
                showAttr = _props6.showAttr,
                freeTextSelection = _props6.freeTextSelection,
                inputField = this.refs.inputField,
                _getFromStateOrReduxP5 = this.getFromStateOrReduxProps(),
                focusIndex = _getFromStateOrReduxP5.focusIndex,
                searchResults = _getFromStateOrReduxP5.searchResults,
                inputValue = _getFromStateOrReduxP5.inputValue,
                maxLen = searchResults && searchResults.length - 1;


            if (keyCode === 38) {
                if (focusIndex === false) {
                    this.handleKeyBoardFocus(maxLen);
                } else if (focusIndex - 1 >= 0) {
                    this.handleKeyBoardFocus(focusIndex - 1);
                }
            } else if (keyCode === 40) {
                if (focusIndex === false) {
                    this.handleKeyBoardFocus(0);
                } else if (focusIndex + 1 <= maxLen) {
                    this.handleKeyBoardFocus(focusIndex + 1);
                }
            } else if (keyCode === 13) {
                if (focusIndex !== false && searchResults.length > 0) {
                    this.selectItem(searchResults[focusIndex][showAttr]);
                } else {
                    if (inputValue.length > 0 && freeTextSelection !== false) {
                        this.selectItem(inputValue);
                    } else {
                        this.setStateOrReduxAction({ selectedItem: false, showDropDown: false, showPlaceholder: true });
                        this.selectItem('');
                        inputField.blur();
                    }
                }
            }
        }
    }, {
        key: 'handleKeyBoardFocus',
        value: function handleKeyBoardFocus(index) {
            this.mouseMoveCounter = 0;
            this.handleItemFocus(index);
        }
    }, {
        key: 'handleMouseMove',
        value: function handleMouseMove(index) {
            this.mouseMoveCounter++;
            if (this.mouseMoveCounter === 2) {
                this.handleItemFocus(index);
            }
        }
    }, {
        key: 'handleMouseOverItem',
        value: function handleMouseOverItem(index) {
            if (this.mouseMoveCounter > 1) {
                this.handleItemFocus(index);
            }
        }
    }, {
        key: 'handleItemFocus',
        value: function handleItemFocus(index) {
            this.setStateOrReduxAction({ focusIndex: index });
        }
    }, {
        key: 'selectItem',
        value: function selectItem(val) {
            var addProps = {},
                _getFromStateOrReduxP6 = this.getFromStateOrReduxProps(),
                inputValue = _getFromStateOrReduxP6.inputValue,
                selectedItem = _getFromStateOrReduxP6.selectedItem,
                _props7 = this.props,
                items = _props7.items,
                showAttr = _props7.showAttr;

            if (val === false) {
                addProps.inputValue = '';
                if (typeof items !== 'undefined') {
                    addProps.searchResults = items;
                }
            }
            this.setStateOrReduxAction(_extends({
                selectedItem: val,
                showDropDown: false,
                showPlaceholder: val === false ? true : false
            }, addProps));
            this.selectedItemChanged(val);
        }
    }, {
        key: 'handleItemClick',
        value: function handleItemClick(e) {
            this.selectItem(e.target.innerText);
        }
    }, {
        key: 'handleSelectedClick',
        value: function handleSelectedClick(e) {
            var freeTextSelection = this.props.freeTextSelection,
                _getFromStateOrReduxP7 = this.getFromStateOrReduxProps(),
                inputValue = _getFromStateOrReduxP7.inputValue,
                selectedItem = _getFromStateOrReduxP7.selectedItem;


            this.inputFieldSelectedAfterReopen = true;
            this.setStateOrReduxAction({
                showDropDown: true
            });
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur() {
            this.closeDropDown();
        }
    }, {
        key: 'buildRequestData',
        value: function buildRequestData() {
            var _props8 = this.props,
                url = _props8.url,
                showAttr = _props8.showAttr;

            return {
                url: url,
                showAttr: showAttr
            };
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var _props9 = this.props,
                items = _props9.items,
                showAttr = _props9.showAttr,
                _getFromStateOrReduxP8 = this.getFromStateOrReduxProps(),
                searchResults = _getFromStateOrReduxP8.searchResults,
                innerText = e.target.value;

            if (typeof items !== 'undefined') {
                this.setStateOrReduxAction({ inputValue: innerText, searchResults: items.filter(function (item) {
                        return item[showAttr].includes(innerText);
                    }) });
            } else {
                this.setStateOrReduxAction({ inputValue: innerText });
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

            var _props10 = this.props,
                placeholder = _props10.placeholder,
                showAttr = _props10.showAttr,
                boxHeight = _props10.boxHeight,
                boxWidth = _props10.boxWidth,
                freeTextSelection = _props10.freeTextSelection,
                _getFromStateOrReduxP9 = this.getFromStateOrReduxProps(),
                showPlaceholder = _getFromStateOrReduxP9.showPlaceholder,
                inputValue = _getFromStateOrReduxP9.inputValue,
                searchResults = _getFromStateOrReduxP9.searchResults,
                showDropDown = _getFromStateOrReduxP9.showDropDown,
                fetching = _getFromStateOrReduxP9.fetching,
                selectedItem = _getFromStateOrReduxP9.selectedItem,
                error = _getFromStateOrReduxP9.error,
                resetSelected = _getFromStateOrReduxP9.resetSelected,
                focusIndex = _getFromStateOrReduxP9.focusIndex,
                resultAvailable = searchResults && searchResults.length > 0,
                hasSelected = selectedItem && selectedItem.length > 0,
                placeholderExist = typeof placeholder !== 'undefined' && placeholder.length > 0,
                showInputField = showDropDown || !hasSelected,
                showDropDownIcon = (resultAvailable || hasSelected) && !fetching && !showDropDown,
                showDropUpIcon = showDropDown && !fetching && inputValue.length > 0,
                showLeftIcon = showDropDown && inputValue.length === 0,
                errorsAvailable = error !== false;

            return _react2.default.createElement(
                'div',
                { ref: 'mainBox', className: 'react-select-suggest',
                    style: this.checkWidth(boxWidth),
                    onKeyDown: this.handleKeyDown,
                    onMouseLeave: this.handleMouseLeave },
                _react2.default.createElement(
                    'div',
                    { className: 'react-select-suggest-input-main' },
                    _react2.default.createElement(
                        'div',
                        { className: 'react-select-placeholder',
                            style: this.checkDisplay(showPlaceholder && placeholderExist) },
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
                            style: this.checkDisplay(!showInputField),
                            onClick: this.handleSelectedClick },
                        selectedItem
                    ),
                    _react2.default.createElement('input', { onFocus: this.handleFocus,
                        onBlur: this.handleBlur,
                        onClick: this.handleClick,
                        onChange: this.handleChange,
                        style: Object.assign(this.checkDisplay(showInputField), this.checkWidth(boxWidth)),
                        ref: 'inputField', value: inputValue }),
                    _react2.default.createElement(
                        'span',
                        { className: 'react-select-clear',
                            onClick: this.handleClear,
                            style: this.checkDisplay(hasSelected) },
                        'x'
                    ),
                    _react2.default.createElement('span', { className: 'react-select-bottom-arrow',
                        onClick: this.handleClickArrow,
                        style: this.checkDisplay(showDropDownIcon) }),
                    _react2.default.createElement('span', { className: 'react-select-up-arrow',
                        onClick: this.handleClickArrow,
                        style: this.checkDisplay(showDropUpIcon) }),
                    _react2.default.createElement('span', { className: 'react-select-left-arrow',
                        onClick: this.handleClickArrow,
                        style: this.checkDisplay(showLeftIcon) })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'react-select-drop-down',
                        ref: 'dropDown',
                        style: Object.assign(this.checkDisplay(resultAvailable && showDropDown), this.checkHeight(boxHeight)) },
                    resultAvailable && showDropDown && _react2.default.createElement(
                        'ul',
                        null,
                        searchResults.map(function (result, index) {
                            return _react2.default.createElement(_ReactSelectSuggestItem2.default, {
                                onHandleItemClick: _this2.handleItemClick,
                                onHandleItemFocus: _this2.handleMouseOverItem,
                                onHandleMouseMove: _this2.handleMouseMove,
                                index: index,
                                key: index,
                                result: result,
                                showAttr: showAttr,
                                focusIndex: focusIndex });
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
    showAttr: _propTypes2.default.string.isRequired,
    url: _propTypes2.default.string,
    namespace: _propTypes2.default.string,
    boxWidth: _propTypes2.default.string,
    boxHeight: _propTypes2.default.string,
    freeTextSelection: _propTypes2.default.bool,
    placeholder: _propTypes2.default.string,
    reduxComponent: _propTypes2.default.bool,
    reactSelectReducer: _propTypes2.default.object,
    actions: _propTypes2.default.object,
    onSelectedChanged: _propTypes2.default.func,
    items: _propTypes2.default.array
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
    var namespace = ownProps.namespace || 'reactSelectReducer';
    return {
        reactSelectReducer: state[namespace],
        reduxComponent: true,
        namespace: namespace
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