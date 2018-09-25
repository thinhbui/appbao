import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import appReducer from './reducers';
import Navigator from './navigators/rootNavigator';

const store = createStore(appReducer, applyMiddleware(thunk));

const App = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);

export default App;
