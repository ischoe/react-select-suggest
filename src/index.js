import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Demo from './Demo';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ReactSelectSuggestReducer } from './export';

const middleWare = applyMiddleware(thunk);
const reducer = combineReducers({reactSelectReducer : ReactSelectSuggestReducer});
const store = createStore(reducer, middleWare);

render(
  <AppContainer>
    <Provider store={store}>
      <Demo />
    </Provider>  
  </AppContainer>,
  document.getElementById('main-app')
);