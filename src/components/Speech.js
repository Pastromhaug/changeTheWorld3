
import React, { Component } from 'react';
import { FlatList, View, Text, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import SpeechModule from '../speech';

class Speech extends Component {
    constructor(props) {
        super(props);
        // this.messagesRef = firebase.database().ref('messages');
        // this.lastMessageRef = null;

        DeviceEventEmitter.addListener('speechReceived', (e) => {
            console.log(e);
            props.addOrUpdateMessageAsync(e.text, e.isFinal);
            // if (props.messages.length === 0) {
            //     props.addMessageAsync(e.text, e.isFinal);
            //     // const message = {
            //     //     text: e.text,
            //     //     key: state.messages.length.toString(),
            //     //     isFinal: e.isFinal,
            //     // };
            //     // newState.messages = [message];
            //     // this.lastMessageRef = this.messagesRef.push(message);
            // } else if (props.messages[0].isFinal) {
            //     props.addMessageAsync(e.text, e.isFinal);
            //     // const message = {
            //     //     text: e.text,
            //     //     key: state.messages.length.toString(),
            //     //     isFinal: e.isFinal,
            //     // };
            //     // newState.messages = [message].concat(newState.messages);
            //     // this.lastMessageRef = this.messagesRef.push(message);
            // } else {
            //     props.updateMessageAsync(e.text, e.isFinal);
            //     // let message = newState.messages[0];
            //     // message.text = e.text;
            //     // message.isFinal = e.isFinal;
            //     // newState.messages[0] = message;
            //     // this.lastMessageRef.set(message);
            // }
        });

        DeviceEventEmitter.addListener('speechServiceConnected', (e) => {
            console.log('speechServiceConnected');
            props.setSpeechServiceConnected(true);
        })
        DeviceEventEmitter.addListener('speechServiceDisconnected', (e) => {
            console.log('speechServiceDisconnected');
            props.setSpeechServiceConnected(false);
        })
        DeviceEventEmitter.addListener('onVoiceStart', (e) => {
            console.log('onVoiceStart');
            props.setHearingVoice(true);
        })
        DeviceEventEmitter.addListener('onVoiceEnd', (e) => {
            console.log('onVoiceEnd');
            props.setHearingVoice(false);
        })
    }

    componentDidMount() {
        SpeechModule.bindSpeechService();
        SpeechModule.startVoiceRecorder();
    }

    render() {
        const connectedColor = this.props.speechServiceConnected ? 'green' : 'red';
        const hearingVoiceColor = this.props.hearingVoice ? 'blue' : 'yellow';
        return (
            <View>
                <Text style={{backgroundColor: connectedColor}}/>
                <Text style={{backgroundColor: hearingVoiceColor}}/>
                <FlatList
                  inverted
                  data={ this.props.messages }
                  renderItem={ ({ item }) => <Text>{item.text}</Text> }
                />
            </View>
        );
    }
}

const mapState = state => ({
    messages: state.messages,
    speechServiceConnected: state.speechService.connected,
    hearingVoice: state.speechService.hearingVoice,
});

const mapDispatch = dispatch => ({
    addOrUpdateMessageAsync: (text, isFinal) => {
        dispatch.messages.addOrUpdateMessageAsync({text, isFinal});
    },
    setSpeechServiceConnected: (isConnected) => {
        dispatch.speechService.setConnected({isConnected})
    },
    setHearingVoice: (isHearingVoice) => {
        dispatch.speechService.setHearingVoice({isHearingVoice})
    },
});

export default connect(mapState, mapDispatch)(Speech);
