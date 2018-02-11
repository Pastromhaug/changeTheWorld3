
import Speech from './src/components/Speech'
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { View } from 'react-native';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

// const loggerMiddleware = createLogger();

// const store = createStore(
//     rootReducer,
//     applyMiddleware(
//         thunkMiddleware,
//         loggerMiddleware
//     )
// );

export default class App extends Component<Props> {
  render() {
    return (
      /*<Provider store={store}>*/
        <Speech/>
      // </Provider>
    );
  }
}

