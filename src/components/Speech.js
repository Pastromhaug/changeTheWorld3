
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';
import { FlatList, View, Text, DeviceEventEmitter, PermissionsAndroid } from 'react-native';

import SpeechModule from '../native_modules/speech';


async function requestRecordAudioPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
            'title': 'Cool Photo App Camera Permission',
            'message': 'Cool Photo App needs access to your camera ' +
                       'so you can take awesome pictures.'
        })
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can record audio")
        } else {
            console.log("record audio permission denied")
        }
    } catch (err) {
        console.warn(err)
    }
}


class Speech extends Component {
    static renderItem({ item }) {
        const { text, user } = item;
        let display = text || '';
        display = user ? text.concat(' - ').concat(user.displayName) : display;
        return <Text>{display}</Text>;
    }

    constructor(props) {
        super(props)
        SpeechModule.bindSpeechService();

        DeviceEventEmitter.addListener('speechReceived', (e) => {
            console.log(e);
            props.sendMessage({
                text: e.text,
                isFinal: e.isFinal,
                user: props.user,
            });
        });

        console.log('current_group', 'groups/' + props.current_goup +'/messages')
        firebase.database()
            .ref('groups/' + props.current_goup +'/messages')
            .orderByValue()
            .limitToLast(20)
            .on('value', (s) => {
                console.log('messages')
                console.log(s.val())
                if (s.val()) {
                    const messages = Object.values(s.val());
                    props.receiveMessages({
                        messages: messages,
                    });
                }
            });

        requestRecordAudioPermission().then(() => {
            SpeechModule.startVoiceRecorder()
        })
    }

    render() {
        return (
            <View>
                <FlatList
                  data={ this.props.messages }
                  keyExtractor={ item => item.key }
                  renderItem={ Speech.renderItem }
                  extraData={ this.props }
                />
            </View>
        );
    }
}

const mapState = state => ({
    messages: state.messaging.messages,
    user: state.user,
    current_goup: state.messaging.current_group,

});

const mapDispatch = dispatch => ({
    sendMessage: dispatch.messaging.sendMessage,
    receiveMessages: dispatch.messaging.receiveMessages,
});

export default connect(mapState, mapDispatch)(Speech);
