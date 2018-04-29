
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, View, Text, DeviceEventEmitter } from 'react-native';


class Groups extends Component {

    static renderItem({ item }) {
        console.log('rendering group', item)
        return (
            <View>
                <Text>{item.name}</Text>
            </View>
        )

    }

    onGroupClick() {
        console.log('clicked')
        this.props.navigation.navigate('Speech')
    }

    componentDidMount() {

        console.log('this.props.groups', this.props.groups)

        firebase.database()
            .ref('users/' + this.props.user.uid + '/groups')
            .on('value', snapshot => {
                const groups = Object.values(snapshot.val());
                var i;
                for (i = 0; i < groups.length; i++) {
                    firebase.database().ref('groups/' + groups[i])
                        .on('value', snapshot => {
                            const group = snapshot.val()
                            this.props.receiveGroup({ group })
                        })
                }
            })
    }

    render() {

        console.log('render groups', this.props.groups)
        return (
            <TouchableOpacity
              onPress={this.onGroupClick}>
                <FlatList
                  data={ Object.values(this.props.groups) }
                  keyExtractor={ item => item.key }
                  renderItem={ Groups.renderItem }
                  extraData={ this.props }
                />
            </TouchableOpacity>
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
