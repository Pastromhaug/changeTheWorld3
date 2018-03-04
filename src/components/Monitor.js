
import { Component } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';

import SpeechModule from '../speech';

class Monitor extends Component {
    constructor(props) {
        super(props);
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

    render() { return null; }
}

const mapState = state => ({
    speechServiceConnected: state.speechService.connected,
    hearingVoice: state.speechService.hearingVoice,
});

const mapDispatch = dispatch => ({
    setSpeechServiceConnected: (isConnected) => {
        dispatch.speechService.setConnected({ isConnected });
    },
    setHearingVoice: (isHearingVoice) => {
        dispatch.speechService.setHearingVoice({ isHearingVoice });
    },
});

export default connect(mapState, mapDispatch)(Monitor);
