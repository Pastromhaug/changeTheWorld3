
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';
import { FlatList, View, Text, DeviceEventEmitter } from 'react-native';


class Speech extends Component {
    static renderItem({ item }) {
        const { text, user } = item;
        let display = text || '';
        display = user ? text.concat(' - ').concat(user.displayName) : display;

        return <Text>{display}</Text>;
    }

    componentDidMount() {
        firebase.database()
            .ref('groups')
            .orderByValue()
            .limitToLast(20)
            .on('value', (s) => {
                const groups = Object.values(s.val());
                this.props.receiveGroups(groups);
            });
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
