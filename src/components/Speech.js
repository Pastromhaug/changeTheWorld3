
import React, { Component } from 'react';
import { FlatList, View, Text, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import SpeechModule from '../speech';

class Speech extends Component {
    constructor(props) {
        super(props);
    }
    //     this.state = { messages: [] };
    //     this.messagesRef = firebase.database().ref('messages');
    //     this.lastMessageRef = null;

    //     DeviceEventEmitter.addListener('speechReceived', (e) => {
    //         console.log(e);
    //         this.setState((state) => {
    //             const newState = Object.assign({}, state);
    //             if (newState.messages.length === 0) {
    //                 const message = {
    //                     text: e.text,
    //                     key: state.messages.length.toString(),
    //                     isFinal: e.isFinal,
    //                 };
    //                 newState.messages = [message];
    //                 this.lastMessageRef = this.messagesRef.push(message);
    //             } else if (newState.messages[0].isFinal) {
    //                 const message = {
    //                     text: e.text,
    //                     key: state.messages.length.toString(),
    //                     isFinal: e.isFinal,
    //                 };
    //                 newState.messages = [message].concat(newState.messages);
    //                 this.lastMessageRef = this.messagesRef.push(message);
    //             } else {
    //                 let message = newState.messages[0];
    //                 message.text = e.text;
    //                 message.isFinal = e.isFinal;
    //                 newState.messages[0] = message;
    //                 this.lastMessageRef.set(message);
    //             }
    //             return newState;
    //         });
    //     });
    // }

    componentDidMount() {
        // SpeechModule.bindSpeechService();
        // SpeechModule.startVoiceRecorder();
        // console.log(this.props.count);
    }

    render() {
        return (
            <View>
                <Text
                  onPress={() => this.props.increment()}> { this.props.count }  </Text>
                <Text
                  onPress={() => this.props.incrementAsync()}> hey </Text>
{/*                <FlatList
                  inverted
                  data={ this.state.messages }
                  renderItem={ ({ item }) => <Text>{item.text}</Text> }
                  extraData={ this.state }
                />*/}
            </View>
        );
    }
}

const mapState = state => ({
    count: state.count,
});

const mapDispatch = dispatch => ({
    incrementAsync: () => dispatch.count.incrementAsync(2),
    increment: () => dispatch.count.increment(1)
});

export default connect(mapState, mapDispatch)(Speech);
