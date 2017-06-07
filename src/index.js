import './index.css';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import App from '../components/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const middleWare = applyMiddleware(thunk);
const store = createStore(reducer, middleWare);

render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>  
  </AppContainer>,
  document.getElementById('main-app')
);

if (module.hot) {
  module.hot.accept('../components/App', () => {
    const NextApp = require('../components/App').default;
    render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}