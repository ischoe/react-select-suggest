'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.reactSelectSuggest = reactSelectSuggest;
var initialState = {
    showPlaceholder: true,
    inputValue: '',
    fetching: false,
    showDropDown: false,
    searchResults: []
};

function reactSelectSuggest() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case 'SHOW_PLACEHOLDER':
            state = _extends({}, state, {
                showPlaceholder: true
            });
            break;

        case 'HIDE_PLACEHOLDER':
            state = _extends({}, state, {
                showPlaceholder: false
            });
            break;

        case 'INPUT_CHANGE':
            state = _extends({}, state, {
                inputValue: action.inputValue
            });
            break;

        case 'SEARCH_RESULTS_START':
            state = _extends({}, state, {
                fetching: true
            });
            break;

        case 'SEARCH_RESULTS_ERROR':
            state = _extends({}, state, {
                fetching: false,
                error: action.error
            });
            break;

        case 'SEARCH_RESULTS_FINISHED':
            state = _extends({}, state, {
                fetching: false,
                searchResults: action.searchResults
            });
            break;

        case 'SHOW_DROPDOWN':
            state = _extends({}, state, {
                showDropDown: true
            });
            break;

        case 'HIDE_DROPDOWN':
            state = _extends({}, state, {
                showDropDown: false
            });
            break;

        case 'CLEAR_SEARCH_RESULTS':
            state = _extends({}, state, {
                searchResults: []
            });
            break;

        case 'SELECT_ITEM':
            state = _extends({}, state, {
                selectedItem: action.selectedItem
            });
            break;

        default:
            break;
    }
    return state;
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(initialState, 'initialState', 'src/components/ReactSelectSuggest/ReactSelectSuggestReducer.js');

    __REACT_HOT_LOADER__.register(reactSelectSuggest, 'reactSelectSuggest', 'src/components/ReactSelectSuggest/ReactSelectSuggestReducer.js');
}();

;