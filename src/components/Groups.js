
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, View, Text, DeviceEventEmitter } from 'react-native';


class Groups extends Component {

    renderItem({ item }) {
        return (
            <TouchableOpacity onPress={() => {
                const current_group = item.key
                this.props.setCurrentGroup({ current_group })
                this.props.navigation.navigate('Speech')
            }}>
                <Text>{item.name}</Text>
            </TouchableOpacity>
        )

    }

    constructor(props) {
        super(props)
        firebase.database()
            .ref('users/' + props.user.uid + '/groups')
            .on('value', snapshot => {
                const groups = Object.values(snapshot.val());
                for (let i = 0; i < groups.length; i++) {
                    firebase.database().ref('groups/' + groups[i])
                        .on('value', snapshot => {
                            const group = snapshot.val()
                            props.receiveGroup({ group })
                        })
                }
            })
    }

    render() {
        return (
            <View>
                <FlatList
                  data={ Object.values(this.props.groups) }
                  keyExtractor={ item => item.key }
                  renderItem={ this.renderItem.bind(this) }
                  extraData={ this.props }
                />
            </View>
        );
    }
}

const mapState = state => ({
    groups: state.messaging.groups,
    user: state.user,
});

const mapDispatch = dispatch => ({
    receiveGroup: dispatch.messaging.receiveGroup,
    setCurrentGroup: dispatch.messaging.setCurrentGroup,
});

export default connect(mapState, mapDispatch)(Groups);
