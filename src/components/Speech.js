
import React, { Component } from 'react';
import SpeechModule from '../speech';
import { View } from 'react-native';



class Speech extends Component {

    componentDidMount() {
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

export default connect(mapStateToProps)(Speech);
