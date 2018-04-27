
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
