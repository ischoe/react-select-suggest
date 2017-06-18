const initialState = {
    showPlaceholder: true,
    inputValue: '',
    fetching: false,
    showDropDown: false,
    searchResults: []
};

export default function reactSelectSuggest(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_PLACEHOLDER':
      state = {
          ...state, 
          showPlaceholder: true
      };
      break;

    case 'HIDE_PLACEHOLDER':
      state = {
          ...state, 
          showPlaceholder: false
      };
      break;

    case 'INPUT_CHANGE':
      state = {
          ...state, 
          inputValue: action.inputValue
      };
      break;

    case 'SEARCH_RESULTS_START':
      state = {
          ...state,
          fetching: true
      };
      break; 

    case 'SEARCH_RESULTS_ERROR':
      state = {
          ...state,
          fetching: false,
          error: action.error
      };
      break;

    case 'SEARCH_RESULTS_FINISHED':
      state = {
          ...state,
          fetching: false,
          searchResults: action.searchResults
      };
      break;

    case 'SHOW_DROPDOWN':
      state = {
          ...state, 
          showDropDown: true
      };
      break;

    case 'HIDE_DROPDOWN':
      state = {
          ...state, 
          showDropDown: false
      };
      break;

    case 'CLEAR_SEARCH_RESULTS':
      state = {
          ...state,
          searchResults: []
      };
      break;

    case 'SELECT_ITEM':
      state = {
          ...state,
          selectedItem: action.selectedItem
      };
      break;           

    default:
      break;
  }
  return state;
} 