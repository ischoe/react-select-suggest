const initialState = {
    showPlaceholder: true,
    inputValue: '',
    fetching: false,
    showDropDown: false,
    searchResults: [],
    error: false,
    selectedItem: ''
};

const reactSelectReducer = (name) => (state = initialState, action) => {
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

    default:
      break;
  }
  return state;
};

export default reactSelectReducer;