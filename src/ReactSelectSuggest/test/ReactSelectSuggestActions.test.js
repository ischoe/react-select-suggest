import test from 'tape';
import sinon from 'sinon';
import axios from 'axios';
import * as ReactSelectSuggestActions from '../ReactSelectSuggestActions';

test('calling the search function will start fetching', (assert) => {
  
  const dispatch = sinon.spy(),
    namespace = 'reducer1';

  ReactSelectSuggestActions.searchForResults(namespace)(dispatch);

  assert.equal(
    dispatch.calledWith({type: namespace+'SEARCH_RESULTS_START'}),
    true,
    'SEARCH_RESULTS_START has been called');

  assert.end();

});
