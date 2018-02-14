
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, DeviceEventEmitter } from 'react-native';

import SpeechModule from '../speech';





class Speech extends Component {

    componentDidMount() {
        SpeechModule.bindSpeechService();

        // DeviceEventEmitter.addListener('speechReceived', function(e) {
        //     console.log(e)
        // });
        // DeviceEventEmitter.addListener('voiceReceived', function(e) {
        //     console.log(e)
        // });
        SpeechModule.startVoiceRecorder();
    }

    render() {
        return (
            <View>
                <Text> hiiiii </Text>
            </View>
        )
    }
}

export default Speech;
