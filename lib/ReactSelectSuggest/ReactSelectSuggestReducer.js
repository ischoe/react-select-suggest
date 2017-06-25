'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var initialState = {
    showPlaceholder: true,
    inputValue: '',
    fetching: false,
    showDropDown: false,
    searchResults: [],
    error: false,
    selectedItem: ''
};

var reactSelectReducer = function reactSelectReducer(name) {
    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments[1];

        var namespace = name || 'reactSelectReducer';
        switch (action.type) {
            case namespace + 'SHOW_PLACEHOLDER':
                state = _extends({}, state, {
                    showPlaceholder: true
                });
                break;

            case namespace + 'HIDE_PLACEHOLDER':
                state = _extends({}, state, {
                    showPlaceholder: false
                });
                break;

            case namespace + 'INPUT_CHANGE':
                state = _extends({}, state, {
                    inputValue: action.inputValue
                });
                break;

            case namespace + 'SEARCH_RESULTS_START':
                state = _extends({}, state, {
                    fetching: true
                });
                break;

            case namespace + 'SEARCH_RESULTS_ERROR':
                state = _extends({}, state, {
                    fetching: false,
                    error: action.error
                });
                break;

            case namespace + 'SEARCH_RESULTS_FINISHED':
                state = _extends({}, state, {
                    fetching: false,
                    searchResults: action.searchResults
                });
                break;

            case namespace + 'SHOW_DROPDOWN':
                state = _extends({}, state, {
                    showDropDown: true
                });
                break;

            case namespace + 'HIDE_DROPDOWN':
                state = _extends({}, state, {
                    showDropDown: false
                });
                break;

            case namespace + 'CLEAR_SEARCH_RESULTS':
                state = _extends({}, state, {
                    searchResults: []
                });
                break;

            case namespace + 'SELECT_ITEM':
                state = _extends({}, state, {
                    selectedItem: action.selectedItem
                });
                break;

            default:
                break;
        }
        return state;
    };
};

var _default = reactSelectReducer;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(initialState, 'initialState', 'src/ReactSelectSuggest/ReactSelectSuggestReducer.js');

    __REACT_HOT_LOADER__.register(reactSelectReducer, 'reactSelectReducer', 'src/ReactSelectSuggest/ReactSelectSuggestReducer.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/ReactSelectSuggest/ReactSelectSuggestReducer.js');
}();

;