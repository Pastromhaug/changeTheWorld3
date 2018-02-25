
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text, DeviceEventEmitter } from 'react-native';
import firebase from 'react-native-firebase';

import SpeechModule from '../speech';

export default class Speech extends Component {

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
    }

    componentDidMount() {
        SpeechModule.bindSpeechService();
        SpeechModule.startVoiceRecorder();
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
