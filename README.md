# react-select-suggest

Adds a suggest-select-box, uses react and redux

# Usage
```
npm install --save react-select-suggest
```
# if you are using Redux

add the reducer :
```
import { combineReducers } from 'redux';
import { ReactSelectSuggestReducer } from 'react-select-suggest';

const rootReducer = combineReducers({
    reactSelectReducer : ReactSelectSuggestReducer()
});

```

add the component :

```

import { ReactSelectSuggestRedux } from 'react-select-suggest';

const Demo = () => (
  <div>
    <ReactSelectSuggestRedux
        placeholder="Search..."
        url="your_url"
        showAttr="your_attribute"
        boxHeight="100"
        boxWidth="300"/>
  </div>
)
```

# if your are NOT using Redux

just add the component :

```

import { ReactSelectSuggest } from 'react-select-suggest';

const Demo = () => (
  <div>
    <ReactSelectSuggest
        placeholder="Search..."
        url="your_url"
        showAttr="your_attribute"
        boxHeight="100"
        boxWidth="300"/>
  </div>
)
```

# if you are using Redux and want to add multiple components on the same page
```
const rootReducer = combineReducers({
    your_namespace_1 : ReactSelectSuggestReducer('your_namespace_1'),
    your_namespace_2 : ReactSelectSuggestReducer('your_namespace_2')
});

<ReactSelectSuggestRedux
        placeholder="Search..."
        url="your_url"
        showAttr="your_attribute"
        boxHeight="100"
        boxWidth="300"
        namespace="your_namespace_1"/>
        
<ReactSelectSuggestRedux
        placeholder="Search..."
        url="your_url"
        showAttr="your_attribute"
        boxHeight="100"
        boxWidth="300"
        namespace="your_namespace_2"/>        
```

# Options
showAttr : Required - the attribute which contains the data you want to display  

url : Optional - is ignored when items is set - the uri which needs to return json data 

items : Optional - this needs to be an array of json objects 

placeholder : Optional - a string which is the placeholder for the empty input field 

boxHeight : Optional - the height of the opening dropdown box, if not specified it is always as high as the results  

boxWidth : Optional - the width of the whole component, if not specified it is as width as the parent div 

freeTextSelection : Optional boolean - if false you can't select a value which is not in the provided list 

onSelectedChanged : Optional - change handler function which returns the selected value 
