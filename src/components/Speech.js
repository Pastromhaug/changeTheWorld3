
import React, { Component } from 'react';
import { FlatList, View, Text, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import SpeechModule from '../speech';

class Speech extends Component {
    constructor(props) {
        super(props);
        // this.messagesRef = firebase.database().ref('messages');
        // this.lastMessageRef = null;

        DeviceEventEmitter.addListener('speechReceived', (e) => {
            console.log(e);
            props.addOrUpdateMessageAsync(e.text, e.isFinal);
            // if (props.messages.length === 0) {
            //     props.addMessageAsync(e.text, e.isFinal);
            //     // const message = {
            //     //     text: e.text,
            //     //     key: state.messages.length.toString(),
            //     //     isFinal: e.isFinal,
            //     // };
            //     // newState.messages = [message];
            //     // this.lastMessageRef = this.messagesRef.push(message);
            // } else if (props.messages[0].isFinal) {
            //     props.addMessageAsync(e.text, e.isFinal);
            //     // const message = {
            //     //     text: e.text,
            //     //     key: state.messages.length.toString(),
            //     //     isFinal: e.isFinal,
            //     // };
            //     // newState.messages = [message].concat(newState.messages);
            //     // this.lastMessageRef = this.messagesRef.push(message);
            // } else {
            //     props.updateMessageAsync(e.text, e.isFinal);
            //     // let message = newState.messages[0];
            //     // message.text = e.text;
            //     // message.isFinal = e.isFinal;
            //     // newState.messages[0] = message;
            //     // this.lastMessageRef.set(message);
            // }
        });
    }

    componentDidMount() {
        SpeechModule.bindSpeechService();
        SpeechModule.startVoiceRecorder();
    }

    render() {
        return (
            <View>
                <Text
                  onPress={() => this.props.increment()}> { this.props.count }  </Text>
                <Text
                  onPress={() => this.props.increment2()}> { this.props.count2 }  </Text>
                <Text
                  onPress={() => this.props.incrementAsync()}> hey </Text>
                <FlatList
                  inverted
                  data={ this.props.messages }
                  renderItem={ ({ item }) => <Text>{item.text}</Text> }
                  extraData={ this.state }
                />
            </View>
        );
    }
}

const mapState = state => ({
    count: state.count,
    count2: state.count2,
    messages: state.messages,
});

const mapDispatch = dispatch => ({
    incrementAsync: () => dispatch.count.incrementAsync(2),
    increment: () => dispatch.count.increment(1),
    increment2: () => dispatch.count2.increment(1),
    addOrUpdateMessageAsync: (text, isFinal) => {
        dispatch.messages.addOrUpdateMessageAsync({text, isFinal});
    },
});

export default connect(mapState, mapDispatch)(Speech);
