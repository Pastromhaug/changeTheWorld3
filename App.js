
import React from 'react';
import firebase from 'react-native-firebase';
import { YellowBox } from 'react-native';

import LoggedOut from './src/components/LoggedOut';
import Speech from './src/components/Speech';


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
        if (this.state.loading) return null;
        if (this.state.user) return <Speech />;
        return <LoggedOut />;
    }
}
