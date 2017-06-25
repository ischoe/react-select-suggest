import axios from 'axios';

export const showPlaceholder = (namespace) => ({ type: namespace + 'SHOW_PLACEHOLDER' });
export const hidePlaceholder = (namespace) => ({ type: namespace + 'HIDE_PLACEHOLDER' });
export const showDropDown = (namespace) => ({ type: namespace + 'SHOW_DROPDOWN' });
export const hideDropDown = (namespace) => ({ type: namespace+ 'HIDE_DROPDOWN' });
export const changeInputValue = (namespace, inputValue) => ({ type: namespace + 'INPUT_CHANGE', inputValue });
export const selectItem = (namespace, selectedItem) => ({ type: namespace + 'SELECT_ITEM', selectedItem });

export const searchResultsStart = (namespace) => ({ type: namespace + 'SEARCH_RESULTS_START' });
export const searchResultsSuccess = (namespace, searchResults) => ({ type: namespace + 'SEARCH_RESULTS_FINISHED', searchResults });
export const clearSearchResults = (namespace, searchResults) => ({ type: namespace + 'CLEAR_SEARCH_RESULTS', searchResults });
export const searchResultsError = (namespace, error) => ({ type: namespace + 'SEARCH_RESULTS_ERROR', error });

export const searchForResults = (namespace, inputValue, sendData) => dispatch => {
    dispatch(searchResultsStart(namespace));
    dispatch(fetchResults(namespace, inputValue, sendData));
};

const fetchResults = (namespace, inputValue, sendData) => dispatch => {
    return axios.get(sendData.url)
        .then(result =>  result.data)
        .then(data =>  data.filter(item => item[sendData.showAttr].includes(inputValue)))
        .then(returnResults =>  dispatch(searchResultsSuccess(namespace, returnResults)))
        .catch(error => dispatch(searchResultsError(namespace, error.message)));
};