
import React, { Component } from 'react';
import SpeechModule from '../speech';
import { connect } from 'react-redux';
import { View } from 'react-native';



class Speech extends Component {

    componentDidMount() {
        SpeechModule.bindSpeechService();
        SpeechModule.startVoiceRecorder();
    }

    render() {
        return (
            <View>
                hiiiii
            </View>
        )
    }
}

export default Speech;
