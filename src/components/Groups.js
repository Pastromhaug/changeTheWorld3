
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';
import { FlatList, View, Text, DeviceEventEmitter } from 'react-native';


class Groups extends Component {
    static renderItem({ item }) {
        console.log('rendering group', item)
        return <Text>{item.name}</Text>;
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
        return (
            <View>
                <FlatList
                  data={ Object.values(this.props.groups) }
                  keyExtractor={ item => item.key }
                  renderItem={ Groups.renderItem }
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
