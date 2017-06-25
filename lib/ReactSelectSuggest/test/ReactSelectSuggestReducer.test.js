'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ReactSelectSuggestReducer = require('../ReactSelectSuggestReducer');

var _ReactSelectSuggestReducer2 = _interopRequireDefault(_ReactSelectSuggestReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var namespace = 'reducer1';

(0, _tape2.default)('SHOW_PLACEHOLDER can be set', function (assert) {
  var action = {
    type: namespace + 'SHOW_PLACEHOLDER'
  },
      state = {};

  assert.deepEqual((0, _ReactSelectSuggestReducer2.default)(namespace)(state, action), { showPlaceholder: true }, 'SHOW_PLACEHOLDER sets showplaceholder to true');

  assert.end();
});

(0, _tape2.default)('HIDE_PLACEHOLDER can be set', function (assert) {
  var action = {
    type: namespace + 'HIDE_PLACEHOLDER'
  },
      state = {};

  assert.deepEqual((0, _ReactSelectSuggestReducer2.default)(namespace)(state, action), { showPlaceholder: false }, 'HIDE_PLACEHOLDER sets showplaceholder to false');

  assert.end();
});

(0, _tape2.default)('INPUT_CHANGE works', function (assert) {
  var action = {
    type: namespace + 'INPUT_CHANGE',
    inputValue: 'ok'
  },
      state = {};

  assert.deepEqual((0, _ReactSelectSuggestReducer2.default)(namespace)(state, action), { inputValue: 'ok' }, 'INPUT_CHANGE can change the inputValue');

  assert.end();
});

(0, _tape2.default)('HIDE_PLACEHOLDER can be set', function (assert) {
  var action = {
    type: namespace + 'HIDE_PLACEHOLDER'
  },
      state = {
    showPlaceholder: false
  };

  assert.deepEqual((0, _ReactSelectSuggestReducer2.default)(namespace)(state, action), { showPlaceholder: false }, 'HIDE_PLACEHOLDER sets showplaceholder to false');

  assert.end();
});

(0, _tape2.default)('SEARCH_RESULTS_START can search for results', function (assert) {
  var action = {
    type: namespace + 'SEARCH_RESULTS_START'
  },
      state = {};

  assert.deepEqual((0, _ReactSelectSuggestReducer2.default)(namespace)(state, action), { fetching: true }, 'SEARCH_RESULTS_START starts fetching');

  assert.end();
});

(0, _tape2.default)('SEARCH_RESULTS_FINISHED returns the results', function (assert) {
  var action = {
    type: namespace + 'SEARCH_RESULTS_FINISHED',
    searchResults: ['123', '456']
  },
      state = {};

  assert.deepEqual((0, _ReactSelectSuggestReducer2.default)(namespace)(state, action), {
    fetching: false,
    searchResults: ['123', '456']
  }, 'SEARCH_RESULTS_FINISHED stops fetching and returns correct searchResults');

  assert.end();
});

(0, _tape2.default)('SEARCH_RESULTS_ERROR returns the error', function (assert) {
  var action = {
    type: namespace + 'SEARCH_RESULTS_ERROR',
    error: 'it failed'
  },
      state = {};

  assert.deepEqual((0, _ReactSelectSuggestReducer2.default)(namespace)(state, action), {
    fetching: false,
    error: 'it failed'
  }, 'SEARCH_RESULTS_ERROR stops fetching and shows the error');

  assert.end();
});

(0, _tape2.default)('HIDE_DROPDOWN hides the dropdown', function (assert) {
  var action = {
    type: namespace + 'HIDE_DROPDOWN',
    showDropDown: false
  },
      state = {};

  assert.deepEqual((0, _ReactSelectSuggestReducer2.default)(namespace)(state, action), { showDropDown: false }, 'HIDE_DROPDOWN hides the drop down');

  assert.end();
});

(0, _tape2.default)('SHOW_DROPDOWN shows the dropdown', function (assert) {
  var action = {
    type: namespace + 'SHOW_DROPDOWN',
    showDropDown: true
  },
      state = {};

  assert.deepEqual((0, _ReactSelectSuggestReducer2.default)(namespace)(state, action), { showDropDown: true }, 'SHOW_DROPDOWN shows the drop down');

  assert.end();
});

(0, _tape2.default)('CLEAR_SEARCH_RESULTS removes the searchresults', function (assert) {
  var action = {
    type: namespace + 'CLEAR_SEARCH_RESULTS',
    searchResults: []
  },
      state = {};

  assert.deepEqual((0, _ReactSelectSuggestReducer2.default)(namespace)(state, action), { searchResults: [] }, 'CLEAR_SEARCH_RESULTS clears searchresults');

  assert.end();
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(namespace, 'namespace', 'src/ReactSelectSuggest/test/ReactSelectSuggestReducer.test.js');
}();

;