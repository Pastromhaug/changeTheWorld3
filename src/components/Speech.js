
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text, DeviceEventEmitter } from 'react-native';

import SpeechModule from '../speech';


import GoogleSignIn from '../googleSignIn';

async function googleSignIn() {
  await GoogleSignIn.configure({

    // iOS, Android
    // https://developers.google.com/identity/protocols/googlescopes
    scopes: ['profile', 'email'],

    // // iOS, Android
    // // Whether to request email and basic profile.
    // // [Default: true]
    // // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a06bf16b507496b126d25ea909d366ba4
    // shouldFetchBasicProfile: false,

    // // Android
    // // Whether to force code for refresh token.
    // // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#requestServerAuthCode(java.lang.String, boolean)
    // forceCodeForRefreshToken: false,

    // // Android
    // // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#setAccountName(java.lang.String)
    // accountName: 'yourServerAccountName',

    // // iOS, Android
    // // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a6d85d14588e8bf21a4fcf63e869e3be3
    // hostedDomain: 'yourHostedDomain',
  });

  const user = await GoogleSignIn.signIn();

  console.log(user);
  return user;
}





class Speech extends Component {

    constructor(props) {
        super(props);
        this.state = {text: []};
        DeviceEventEmitter.addListener('speechReceived', (e) => {
            console.log(e)
            this.setState(state => {
                newState = Object.assign({}, state)
                if (newState.text.length === 0) {
                    newState.text = [{
                        text: e.text,
                        key: state.text.length.toString(),
                        isFinal: e.isFinal
                    }]
                }
                else if (newState.text[0].isFinal) {
                    newState.text = [{
                        text: e.text,
                        key: state.text.length.toString(),
                        isFinal: e.isFinal
                    }].concat(newState.text)
                }
                else {
                    newState.text[0].text = e.text
                    newState.text[0].isFinal = e.isFinal
                }
                return newState;
            })
        });

        DeviceEventEmitter.addListener('RNGoogleSignInSuccess', (e) => {
            console.log('RNGoogleSignInSuccess');
            console.log(e)
        })
        DeviceEventEmitter.addListener('RNGoogleDisconnectSuccess', (e) => {
            console.log('RNGoogleDisconnectSuccess');
            console.log(e)
        })
        DeviceEventEmitter.addListener('RNGoogleDisconnectError', (e) => {
            console.log('RNGoogleDisconnectError');
            console.log(e)
        })
        DeviceEventEmitter.addListener('RNGoogleApiConnectionFailed', (e) => {
            console.log('RNGoogleApiConnectionFailed');
            console.log(e)
        })
        DeviceEventEmitter.addListener('RNGoogleApiConnectionSuspended', (e) => {
            console.log('RNGoogleApiConnectionSuspended');
            console.log(e)
        })
        DeviceEventEmitter.addListener('RNGoogleSignInError', (e) => {
            console.log('RNGoogleSignInError');
            console.log(e)
        })
        DeviceEventEmitter.addListener('RNGoogleSignOutError', (e) => {
            console.log('RNGoogleSignOutError');
            console.log(e)
        })
        DeviceEventEmitter.addListener('RNGoogleSignOutSuccess', (e) => {
            console.log('RNGoogleSignOutSuccess');
            console.log(e)
        })
    }

    componentDidMount() {
        SpeechModule.bindSpeechService();
        SpeechModule.startVoiceRecorder();
        googleSignIn()
    }

    render() {
        return (
            <View>
                <FlatList
                    inverted
                    data={this.state.text}
                    renderItem={({item}) => <Text>{item.text}</Text>}
                    extraData={this.state}
                />
            </View>
        )
    }
}

export default Speech;
