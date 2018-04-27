
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import LoggedOut from './LoggedOut';
import LoggedIn from './LoggedIn';


class LogIn extends Component {
    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            console.log('onAuthStateChanged: ', user);
            if (user) {
                this.props.login(
                    user.displayName,
                    user.email,
                    user.photoUrl,
                    user.uid,
                );
            }
        });
    }
    componentWillUnmount() {
        this.authSubscription();
    }
    render() {
        if (this.props.loggedIn) return <LoggedIn />;
        return <LoggedOut />;
    }
}

const mapState = state => ({
    loggedIn: state.user.loggedIn,
});

const mapDispatch = dispatch => ({
    login: (displayName, email, photoUrl, uid) => {
        dispatch.user.login({
            displayName,
            email,
            photoUrl,
            uid,
        });
    },
});

export default connect(mapState, mapDispatch)(LogIn);
