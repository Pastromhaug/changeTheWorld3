
import React, { Component } from 'react';
import { FlatList, View, Text, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';


class Speech extends Component {
    constructor(props) {
        super(props);
        DeviceEventEmitter.addListener('speechReceived', (e) => {
            console.log(e);
            props.sendMessage(e.text, e.isFinal);
        });

        firebase.database()
            .ref('messages')
            .orderByKey('sortOrder')
            .on('value', (s) => {
                props.receiveMessages({
                    messages: Object.values(s.toJSON()),
                });
            });
    }

    render() {
        const connectedColor = this.props.speechServiceConnected ? 'green' : 'red';
        const hearingVoiceColor = this.props.hearingVoice ? 'blue' : 'yellow';
        console.log('rendering', this.props.messages);
        return (
            <View>
                <Text style={ { backgroundColor: connectedColor } } />
                <Text style={ { backgroundColor: hearingVoiceColor } } />
                <Text> {this.props.messages.toString()} </Text>
                <FlatList
                  inverted
                  data={ this.props.messages }
                  keyExtractor={ item => item.key }
                  renderItem={ item => <Text>{item.text}</Text> }
                  extraData={ this.props }
                />
            </View>
        );
    }
}

const mapState = state => ({
    messages: state.messaging.messages,
});

const mapDispatch = dispatch => ({
    sendMessage: (text, isFinal) => {
        dispatch.messaging.sendMessage({ text, isFinal });
    },
    receiveMessages: (messages) => {
        dispatch.messaging.receiveMessages({ messages });
    },
});

export default connect(mapState, mapDispatch)(Speech);
