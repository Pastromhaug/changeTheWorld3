
import React, { Component } from 'react';
import { View, Text, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
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

class LoggedOut extends Component {
    constructor(props) {
        super(props);
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            console.log('onAuthStateChanged: ');
            console.log(user)

            if (user) {
                this.props.login({
                    displayName: user._user.displayName,
                    email :user._user.email,
                    photoUrl: user._user.photoUrl,
                    uid: user._user.uid,
                });
                this.props.navigation.navigate('App');
                console.log('called navigate in loggedout')
            }
        });

        DeviceEventEmitter.addListener('RNGoogleSignInSuccess', (e) => {
            console.log('RNGoogleSignInSuccess');
            console.log(e);
            firebaseSignIn(e.idToken, e.accessToken);
        });

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

const mapDispatch = dispatch => ({
    login: dispatch.user.login
});

export default connect(undefined, mapDispatch)(LoggedOut);
