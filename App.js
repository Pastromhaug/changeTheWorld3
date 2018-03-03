
import React from 'react';
import firebase from 'react-native-firebase';
import { YellowBox } from 'react-native';
import { init } from '@rematch/core';
import { Provider } from 'react-redux'

import LoggedOut from './src/components/LoggedOut';
import Speech from './src/components/Speech';
import * as models from './src/models/models';


YellowBox.ignoreWarnings(['Deprecated firebase']);

const store = init({
    models,
});

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            console.log('onAuthStateChanged: ', user);
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
        let show = null;
        if (this.state.loading) show = null;
        if (this.state.user) show = <Speech />;
        else show = <LoggedOut />;
        return (
            <Provider store={ store }>
                { show }
            </Provider>
        );
    }
}
