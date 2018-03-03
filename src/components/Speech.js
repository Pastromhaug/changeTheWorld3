
import React, { Component } from 'react';
import { FlatList, View, Text, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import SpeechModule from '../speech';

class Speech extends Component {
    constructor(props) {
        super(props);
        DeviceEventEmitter.addListener('speechReceived', (e) => {
            console.log(e);
            props.addOrUpdateMessageAsync(e.text, e.isFinal);
        });

        DeviceEventEmitter.addListener('speechServiceConnected', () => {
            console.log('speechServiceConnected');
            props.setSpeechServiceConnected(true);
        });
        DeviceEventEmitter.addListener('speechServiceDisconnected', () => {
            console.log('speechServiceDisconnected');
            props.setSpeechServiceConnected(false);
        });
        DeviceEventEmitter.addListener('onVoiceStart', () => {
            console.log('onVoiceStart');
            props.setHearingVoice(true);
        });
        DeviceEventEmitter.addListener('onVoiceEnd', () => {
            console.log('onVoiceEnd');
            props.setHearingVoice(false);
        });
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
                <Text style={ { backgroundColor: connectedColor } } />
                <Text style={ { backgroundColor: hearingVoiceColor } } />
                <FlatList
                  inverted
                  data={ this.props.messages }
                  renderItem={ ({ item }) => <Text>{item.text}</Text> }
                  extraData={ this.props.messages }
                />
            </View>
        );
    }
}

const mapState = state => ({
    messages: state.messaging.messages,
    speechServiceConnected: state.speechService.connected,
    hearingVoice: state.speechService.hearingVoice,
});

const mapDispatch = dispatch => ({
    addOrUpdateMessageAsync: (text, isFinal) => {
        dispatch.messaging.addOrUpdateMessageAsync({ text, isFinal });
    },
    setSpeechServiceConnected: (isConnected) => {
        dispatch.speechService.setConnected({ isConnected });
    },
    setHearingVoice: (isHearingVoice) => {
        dispatch.speechService.setHearingVoice({ isHearingVoice });
    },
});

export default connect(mapState, mapDispatch)(Speech);
