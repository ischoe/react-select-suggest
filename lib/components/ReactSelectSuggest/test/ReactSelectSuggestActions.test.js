'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _ReactSelectSuggestActions = require('../ReactSelectSuggestActions');

var ReactSelectSuggestActions = _interopRequireWildcard(_ReactSelectSuggestActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)('calling the search function will start fetching', function (assert) {

  var dispatch = _sinon2.default.spy();

  ReactSelectSuggestActions.searchForResults()(dispatch);

  assert.equal(dispatch.calledWith({ type: 'SEARCH_RESULTS_START' }), true, 'SEARCH_RESULTS_START has been called');
  /*
  assert.equal(
    dispatch.calledWith({type: 'SEARCH_RESULTS_START'}),
    true,
    'SEARCH_RESULTS_START has been called');      
  */
  assert.end();
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;