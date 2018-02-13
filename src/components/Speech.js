
import React, { Component } from 'react';
import SpeechModule from '../speech';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';



class Speech extends Component {

    componentDidMount() {
        SpeechModule.bindSpeechService();
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
