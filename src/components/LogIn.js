
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
                this.props.signIn({
                    displayName: user.displayname,
                    email: user.email,
                    photoUrl: user.photoUrl,
                    firebaseId: firebase.uid,
                });
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
    signIn: (displayName, email, photoUrl) => {
        dispatch.user.signIn({ displayName, email, photoUrl });
    },
});

export default connect(mapState, mapDispatch)(LogIn);
