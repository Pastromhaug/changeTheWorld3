
import React, { Component } from 'react';
import { View, Text, DeviceEventEmitter, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';

import SpeechModule from '../native_modules/speech';

async function requestRecordAudioPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        'title': 'Cool Photo App Camera Permission',
        'message': 'Cool Photo App needs access to your camera ' +
                   'so you can take awesome pictures.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can record audio")
    } else {
      console.log("record audio permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

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
        DeviceEventEmitter.addListener('bindSpeechServiceError', (e) => {
            console.log('bindSpeechServiceError', e);
            props.setHearingVoice(false);
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
        console.log('monitor mounted');
        SpeechModule.bindSpeechService();
        requestRecordAudioPermission().then(() => {
            SpeechModule.startVoiceRecorder()
        })
    }

    render() {
        const connectedColor = this.props.speechServiceConnected ? 'green' : 'red';
        const hearingVoiceColor = this.props.hearingVoice ? 'blue' : 'yellow';
        return (
            <View>
                <Text style={ { backgroundColor: connectedColor } } />
                <Text style={ { backgroundColor: hearingVoiceColor } } />
            </View>
        );
    }
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
