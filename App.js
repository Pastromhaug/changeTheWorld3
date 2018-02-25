
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { View } from 'react-native';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import firebase from 'react-native-firebase';

import LoggedOut from './src/components/LoggedOut';
import Speech from './src/components/Speech'

import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Deprecated firebase']);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      console.log('onAuthStateChanged: ', user)
      this.setState({
        loading: false,
        user,
      });
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }
  render() {
    if (this.state.loading) return null;
    if (this.state.user) return <Speech/>;
    return <LoggedOut />;
  }
}
