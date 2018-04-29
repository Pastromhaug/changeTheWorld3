
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, View, Text, DeviceEventEmitter } from 'react-native';


class Groups extends Component {

    renderItem({ item }) {
        console.log('rendering group', item)
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Speech')}>
                <Text>{item.name}</Text>
            </TouchableOpacity>
        )

    }

    constructor(props) {
        super(props)
        console.log('this.props.groups', props.groups)

        firebase.database()
            .ref('users/' + props.user.uid + '/groups')
            .on('value', snapshot => {
                const groups = Object.values(snapshot.val());
                var i;
                for (i = 0; i < groups.length; i++) {
                    firebase.database().ref('groups/' + groups[i])
                        .on('value', snapshot => {
                            const group = snapshot.val()
                            props.receiveGroup({ group })
                        })
                }
            })
    }

    render() {

        console.log('render groups', this.props.groups)
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
    receiveGroup: dispatch.messaging.receiveGroup
});

export default connect(mapState, mapDispatch)(Groups);
