
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text, DeviceEventEmitter } from 'react-native';

import SpeechModule from '../speech';


import GoogleSignIn from '../googleSignIn';

async function googleSignIn() {
  await GoogleSignIn.configure({ });
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
