# react-select-suggest

Adds a suggest-select-box, uses react and redux

# Usage
```
npm install --save react-select-suggest
```
 add the reducer :
 
 ```
 import { ReactSelectSuggestReducer } from 'react-select-suggest';

const rootReducer = combineReducers({
    ReactSelectSuggestReducer
});
 ```
  add the component :
```
import { ReactSelectSuggest, ReactSelectSuggestActions } from 'react-select-suggest';

const Demo = ({reactSelectSuggest, actions}) => (
  <div>
    <ReactSelectSuggest
        placeholder="Search..."
        url="your_url"
        showAttr="your_attribute"
        boxHeight= "100"
        boxWidth="300"
        reactSelectSuggest={reactSelectSuggest}
        actions={actions}/>
  </div>
)

const mapStateToProps = state => ({
    reactSelectSuggest: state.ReactSelectSuggestReducer
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...ReactSelectSuggestActions}, dispatch)
});
```