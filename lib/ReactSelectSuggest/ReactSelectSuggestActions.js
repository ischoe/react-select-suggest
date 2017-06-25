'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.searchForResults = exports.searchResultsError = exports.clearSearchResults = exports.searchResultsSuccess = exports.searchResultsStart = exports.selectItem = exports.changeInputValue = exports.hideDropDown = exports.showDropDown = exports.hidePlaceholder = exports.showPlaceholder = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var showPlaceholder = exports.showPlaceholder = function showPlaceholder(namespace) {
    return { type: namespace + 'SHOW_PLACEHOLDER' };
};
var hidePlaceholder = exports.hidePlaceholder = function hidePlaceholder(namespace) {
    return { type: namespace + 'HIDE_PLACEHOLDER' };
};
var showDropDown = exports.showDropDown = function showDropDown(namespace) {
    return { type: namespace + 'SHOW_DROPDOWN' };
};
var hideDropDown = exports.hideDropDown = function hideDropDown(namespace) {
    return { type: namespace + 'HIDE_DROPDOWN' };
};
var changeInputValue = exports.changeInputValue = function changeInputValue(namespace, inputValue) {
    return { type: namespace + 'INPUT_CHANGE', inputValue: inputValue };
};
var selectItem = exports.selectItem = function selectItem(namespace, selectedItem) {
    return { type: namespace + 'SELECT_ITEM', selectedItem: selectedItem };
};

var searchResultsStart = exports.searchResultsStart = function searchResultsStart(namespace) {
    return { type: namespace + 'SEARCH_RESULTS_START' };
};
var searchResultsSuccess = exports.searchResultsSuccess = function searchResultsSuccess(namespace, searchResults) {
    return { type: namespace + 'SEARCH_RESULTS_FINISHED', searchResults: searchResults };
};
var clearSearchResults = exports.clearSearchResults = function clearSearchResults(namespace, searchResults) {
    return { type: namespace + 'CLEAR_SEARCH_RESULTS', searchResults: searchResults };
};
var searchResultsError = exports.searchResultsError = function searchResultsError(namespace, error) {
    return { type: namespace + 'SEARCH_RESULTS_ERROR', error: error };
};

var searchForResults = exports.searchForResults = function searchForResults(namespace, inputValue, sendData) {
    return function (dispatch) {
        dispatch(searchResultsStart(namespace));
        dispatch(fetchResults(namespace, inputValue, sendData));
    };
};

var fetchResults = function fetchResults(namespace, inputValue, sendData) {
    return function (dispatch) {
        return _axios2.default.get(sendData.url).then(function (result) {
            return result.data;
        }).then(function (data) {
            return data.filter(function (item) {
                return item[sendData.showAttr].includes(inputValue);
            });
        }).then(function (returnResults) {
            return dispatch(searchResultsSuccess(namespace, returnResults));
        }).catch(function (error) {
            return dispatch(searchResultsError(namespace, error.message));
        });
    };
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(showPlaceholder, 'showPlaceholder', 'src/ReactSelectSuggest/ReactSelectSuggestActions.js');

    __REACT_HOT_LOADER__.register(hidePlaceholder, 'hidePlaceholder', 'src/ReactSelectSuggest/ReactSelectSuggestActions.js');

    __REACT_HOT_LOADER__.register(showDropDown, 'showDropDown', 'src/ReactSelectSuggest/ReactSelectSuggestActions.js');

    __REACT_HOT_LOADER__.register(hideDropDown, 'hideDropDown', 'src/ReactSelectSuggest/ReactSelectSuggestActions.js');

    __REACT_HOT_LOADER__.register(changeInputValue, 'changeInputValue', 'src/ReactSelectSuggest/ReactSelectSuggestActions.js');

    __REACT_HOT_LOADER__.register(selectItem, 'selectItem', 'src/ReactSelectSuggest/ReactSelectSuggestActions.js');

    __REACT_HOT_LOADER__.register(searchResultsStart, 'searchResultsStart', 'src/ReactSelectSuggest/ReactSelectSuggestActions.js');

    __REACT_HOT_LOADER__.register(searchResultsSuccess, 'searchResultsSuccess', 'src/ReactSelectSuggest/ReactSelectSuggestActions.js');

    __REACT_HOT_LOADER__.register(clearSearchResults, 'clearSearchResults', 'src/ReactSelectSuggest/ReactSelectSuggestActions.js');

    __REACT_HOT_LOADER__.register(searchResultsError, 'searchResultsError', 'src/ReactSelectSuggest/ReactSelectSuggestActions.js');

    __REACT_HOT_LOADER__.register(searchForResults, 'searchForResults', 'src/ReactSelectSuggest/ReactSelectSuggestActions.js');

    __REACT_HOT_LOADER__.register(fetchResults, 'fetchResults', 'src/ReactSelectSuggest/ReactSelectSuggestActions.js');
}();

;