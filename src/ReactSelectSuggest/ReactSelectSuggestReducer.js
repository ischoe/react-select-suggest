import defaultState from './ReactSelectInitialState';

const reactSelectReducer = (name) => (state = defaultState, action) => {
  const namespace = name || 'reactSelectReducer';
  switch (action.type) {
    case namespace+'SHOW_PLACEHOLDER':
      state = {
          ...state, 
          showPlaceholder: true
      };
      break;

    case namespace+'HIDE_PLACEHOLDER':
      state = {
          ...state, 
          showPlaceholder: false
      };
      break;

    case namespace+'INPUT_CHANGE':
      state = {
          ...state, 
          inputValue: action.inputValue
      };
      break;

    case namespace+'SEARCH_RESULTS_START':
      state = {
          ...state,
          fetching: true
      };
      break; 

    case namespace+'SEARCH_RESULTS_ERROR':
      state = {
          ...state,
          fetching: false,
          error: action.error
      };
      break;

    case namespace+'SEARCH_RESULTS_FINISHED':
      state = {
          ...state,
          fetching: false,
          searchResults: action.searchResults
      };
      break;

    case namespace+'SHOW_DROPDOWN':
      state = {
          ...state, 
          showDropDown: true
      };
      break;

    case namespace+'HIDE_DROPDOWN':
      state = {
          ...state, 
          showDropDown: false
      };
      break;

    case namespace+'CLEAR_SEARCH_RESULTS':
      state = {
          ...state,
          searchResults: []
      };
      break;

    case namespace+'SELECT_ITEM':
      state = {
          ...state,
          selectedItem: action.selectedItem
      };
      break; 

    case namespace+'RESET_SELECTED':
      state = {
          ...state,
          resetSelected: action.resetSelected
      };
      break;

    case namespace+'SET_FOCUS_INDEX':
      state = {
          ...state,
          focusIndex: action.index
      };
      break;
    
    default:
      break;
  }
  return state;
};

export default reactSelectReducer;