
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
            this.props.sendMessage(
                e.text,
                e.isFinal,
                this.props.user,
            );
        });

        firebase.database()
            .ref('messages')
            .orderByValue()
            .limitToLast(20)
            .on('value', (s) => {
                const messages = Object.values(s.val());
                this.props.receiveMessages(messages);
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

Speech.propTypes = {
    messages: PropTypes.array.isRequired,
};

const mapState = state => ({
    messages: state.messaging.messages,
    user: state.user,
});

const mapDispatch = dispatch => ({
    sendMessage: (text, isFinal, user) => {
        dispatch.messaging.sendMessage({ text, isFinal, user });
    },
    receiveMessages: (messages) => {
        dispatch.messaging.receiveMessages({ messages });
    },
});

export default connect(mapState, mapDispatch)(Speech);
