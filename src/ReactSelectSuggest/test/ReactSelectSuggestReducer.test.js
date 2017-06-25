import test from 'tape';
import sinon from 'sinon';
import ReactSelectSuggestReducer from '../ReactSelectSuggestReducer';

const namespace = 'reducer1';

test('SHOW_PLACEHOLDER can be set', (assert) => {
  const action = {
            type: namespace+'SHOW_PLACEHOLDER'
        },
        state = {};

  assert.deepEqual(
    ReactSelectSuggestReducer(namespace)(state, action), 
    {showPlaceholder: true},
    'SHOW_PLACEHOLDER sets showplaceholder to true');  

  assert.end();
});

test('HIDE_PLACEHOLDER can be set', (assert) => {
  const action = {
            type: namespace+'HIDE_PLACEHOLDER'
        },
        state = {};

  assert.deepEqual(
    ReactSelectSuggestReducer(namespace)(state, action), 
    {showPlaceholder: false},
    'HIDE_PLACEHOLDER sets showplaceholder to false');  

  assert.end();
});

test('INPUT_CHANGE works', (assert) => {
  const action = {
            type: namespace+'INPUT_CHANGE',
            inputValue: 'ok'
        },
        state = {};

  assert.deepEqual(
    ReactSelectSuggestReducer(namespace)(state, action),
    {inputValue: 'ok'},
    'INPUT_CHANGE can change the inputValue');  

  assert.end();
});

test('HIDE_PLACEHOLDER can be set', (assert) => {
  const action = {
            type: namespace+'HIDE_PLACEHOLDER'
        },
        state = {
            showPlaceholder: false
        };

  assert.deepEqual(
    ReactSelectSuggestReducer(namespace)(state, action),
    {showPlaceholder: false},
    'HIDE_PLACEHOLDER sets showplaceholder to false');  

  assert.end();
});

test('SEARCH_RESULTS_START can search for results', (assert) => {
  const action = {
            type: namespace+'SEARCH_RESULTS_START'
        },
        state = {};

  assert.deepEqual(
    ReactSelectSuggestReducer(namespace)(state, action),
    {fetching: true},
    'SEARCH_RESULTS_START starts fetching');  

  assert.end();
});

test('SEARCH_RESULTS_FINISHED returns the results', (assert) => {
  const action = {
            type: namespace+'SEARCH_RESULTS_FINISHED',
            searchResults: ['123', '456']
        },
        state = {};

  assert.deepEqual(
    ReactSelectSuggestReducer(namespace)(state, action),
    {
        fetching: false,
        searchResults: ['123', '456']
    },
    'SEARCH_RESULTS_FINISHED stops fetching and returns correct searchResults');  

  assert.end();
});

test('SEARCH_RESULTS_ERROR returns the error', (assert) => {
  const action = {
            type: namespace+'SEARCH_RESULTS_ERROR',
            error: 'it failed'
        },
        state = {};

  assert.deepEqual(
    ReactSelectSuggestReducer(namespace)(state, action), 
    {
        fetching: false,
        error : 'it failed'
    },
    'SEARCH_RESULTS_ERROR stops fetching and shows the error');  

  assert.end();
});

test('HIDE_DROPDOWN hides the dropdown', (assert) => {
  const action = {
            type: namespace+'HIDE_DROPDOWN',
            showDropDown: false
        },
        state = {};

  assert.deepEqual(
    ReactSelectSuggestReducer(namespace)(state, action),
    {showDropDown: false},
    'HIDE_DROPDOWN hides the drop down');  

  assert.end();
});

test('SHOW_DROPDOWN shows the dropdown', (assert) => {
  const action = {
            type: namespace+'SHOW_DROPDOWN',
            showDropDown: true
        },
        state = {};

  assert.deepEqual(
    ReactSelectSuggestReducer(namespace)(state, action),
    {showDropDown: true},
    'SHOW_DROPDOWN shows the drop down');  

  assert.end();
});

test('CLEAR_SEARCH_RESULTS removes the searchresults', (assert) => {
  const action = {
            type: namespace+'CLEAR_SEARCH_RESULTS',
            searchResults: []
        },
        state = {};

  assert.deepEqual(
    ReactSelectSuggestReducer(namespace)(state, action),
    {searchResults: []},
    'CLEAR_SEARCH_RESULTS clears searchresults');  

  assert.end();
});