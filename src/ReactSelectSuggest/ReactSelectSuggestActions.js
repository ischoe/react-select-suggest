import axios from 'axios';

export const showPlaceholder = () => ({ type: 'SHOW_PLACEHOLDER' });
export const hidePlaceholder = () => ({ type: 'HIDE_PLACEHOLDER' });
export const showDropDown = () => ({ type: 'SHOW_DROPDOWN' });
export const hideDropDown = () => ({ type: 'HIDE_DROPDOWN' });
export const changeInputValue = inputValue => ({ type: 'INPUT_CHANGE', inputValue });
export const selectItem = selectedItem => ({ type: 'SELECT_ITEM', selectedItem });

export const searchResultsStart = () => ({ type: 'SEARCH_RESULTS_START' });
export const searchResultsSuccess = searchResults => ({ type: 'SEARCH_RESULTS_FINISHED', searchResults });
export const clearSearchResults = searchResults => ({ type: 'CLEAR_SEARCH_RESULTS', searchResults });
export const searchResultsError = error => ({ type: 'SEARCH_RESULTS_ERROR', error });

export const searchForResults = (inputValue, sendData) => dispatch => {
    dispatch(searchResultsStart(inputValue));
    dispatch(fetchResults(inputValue, sendData));
};

const fetchResults = (inputValue, sendData) => dispatch => {
    return axios.get(sendData.url)
        .then(result =>  result.data)
        .then(data =>  data.filter(item => item[sendData.showAttr].includes(inputValue)))
        .then(returnResults =>  dispatch(searchResultsSuccess(returnResults)))
        .catch(error => dispatch(searchResultsError(error.message)));
};