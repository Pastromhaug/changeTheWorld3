
import React, { Component } from 'react';
import { View, Text, DeviceEventEmitter } from 'react-native';
import firebase from 'react-native-firebase';
import GoogleSignIn from '../native_modules/googleSignIn';

async function googleSignIn() {
    await GoogleSignIn.configure({});
    const user = await GoogleSignIn.signIn();
    console.log('googleSignIn user: ', user);
}

async function firebaseSignIn(idToken, accessToken) {
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
    const currentUser = await firebase.auth().signInWithCredential(credential);
    console.log('firebaseSignIn user: ', JSON.stringify(currentUser.toJSON()));
}

export default class LoggedOut extends Component {
    constructor(props) {
        super(props);

        DeviceEventEmitter.addListener('RNGoogleSignInSuccess', (e) => {
            console.log('RNGoogleSignInSuccess');
            console.log(e);
            firebaseSignIn(e.idToken, e.accessToken);
        });
        DeviceEventEmitter.addListener('RNGoogleDisconnectSuccess', (e) => {
            console.log('RNGoogleDisconnectSuccess');
            console.log(e);
        });
        DeviceEventEmitter.addListener('RNGoogleDisconnectError', (e) => {
            console.log('RNGoogleDisconnectError');
            console.log(e);
        });
        DeviceEventEmitter.addListener('RNGoogleApiConnectionFailed', (e) => {
            console.log('RNGoogleApiConnectionFailed');
            console.log(e);
        });
        DeviceEventEmitter.addListener('RNGoogleApiConnectionSuspended', (e) => {
            console.log('RNGoogleApiConnectionSuspended');
            console.log(e);
        });
        DeviceEventEmitter.addListener('RNGoogleSignInError', (e) => {
            console.log('RNGoogleSignInError');
            console.log(e);
        });
        DeviceEventEmitter.addListener('RNGoogleSignOutError', (e) => {
            console.log('RNGoogleSignOutError');
            console.log(e);
        });
        DeviceEventEmitter.addListener('RNGoogleSignOutSuccess', (e) => {
            console.log('RNGoogleSignOutSuccess');
            console.log(e);
        });
    }

    componentDidMount() {
        console.log('LoggedOut');
        googleSignIn();
    }

    render() {
        return (
            <View>
                <Text> logged out </Text>
            </View>
        );
    }
}
