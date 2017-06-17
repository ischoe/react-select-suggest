'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _ReactSelectSuggestReducer = require('./components/ReactSelectSuggest/ReactSelectSuggestReducer');

var _ReactSelectSuggestReducer2 = _interopRequireDefault(_ReactSelectSuggestReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
    reactSelectSuggest: _ReactSelectSuggestReducer2.default
});

var _default = rootReducer;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(rootReducer, 'rootReducer', 'src/_reducers.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/_reducers.js');
}();

;