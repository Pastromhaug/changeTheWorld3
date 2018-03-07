
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, DeviceEventEmitter } from 'react-native';


class LoggedOut extends Component {
    constructor(props) {
        super(props);
        DeviceEventEmitter.addListener('RNGoogleSignInSuccess', (e) => {
            console.log('RNGoogleSignInSuccess', e);
            this.props.signInFirebase(e.idToken, e.accessToken);
        });
        DeviceEventEmitter.addListener('RNGoogleDisconnectSuccess', (e) => {
            console.log('RNGoogleDisconnectSuccess', e);
        });
        DeviceEventEmitter.addListener('RNGoogleDisconnectError', (e) => {
            console.log('RNGoogleDisconnectError', e);
        });
        DeviceEventEmitter.addListener('RNGoogleApiConnectionFailed', (e) => {
            console.log('RNGoogleApiConnectionFailed', e);
        });
        DeviceEventEmitter.addListener('RNGoogleApiConnectionSuspended', (e) => {
            console.log('RNGoogleApiConnectionSuspended', e);
        });
        DeviceEventEmitter.addListener('RNGoogleSignInError', (e) => {
            console.log('RNGoogleSignInError', e);
        });
        DeviceEventEmitter.addListener('RNGoogleSignOutError', (e) => {
            console.log('RNGoogleSignOutError', e);
        });
        DeviceEventEmitter.addListener('RNGoogleSignOutSuccess', (e) => {
            console.log('RNGoogleSignOutSuccess', e);
        });
    }

    componentDidMount() {
        console.log('LoggedOut');
        this.props.signInGoogle();
    }

    render() {
        const text = this.props.loading ? 'logged out' : 'loading...';
        return (
            <View>
                <Text> {text} </Text>
            </View>
        );
    }
}

const mapState = state => ({
    loading: state.user.loading,
});

const mapDispatch = dispatch => ({
    signInGoogle: () => {
        dispatch.user.signInGoogle();
    },
    signInFirebase: (idToken, accessToken) => {
        dispatch.user.signInFirebase({ idToken, accessToken });
    },
});

export default connect(mapState, mapDispatch)(LoggedOut);
