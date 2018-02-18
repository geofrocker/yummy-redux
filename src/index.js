import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { App } from './components/App';
import '../node_modules/toastr/build/toastr.css';
import 'loaders.css/src/animations/line-scale.scss';

const store = configureStore(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root'),
);

export default store;
