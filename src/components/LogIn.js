
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import LoggedOut from './LoggedOut';
import LoggedIn from './LoggedIn';


class LogIn extends Component {
    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((e) => {
            console.log('onAuthStateChanged: ', e);
            const user = e.user;
            console.log('user', user);
            this.props.login(user.displayName, user.email, user.photoUrl);
        });
    }
    componentWillUnmount() {
        this.authSubscription();
    }
    render() {
        if (this.props.loading) return null;
        if (this.props.loggedIn) return <LoggedIn />;
        return <LoggedOut />;
    }
}

const mapState = state => ({
    loading: state.user.loading,
    loggedIn: state.user.false,
});

const mapDispatch = dispatch => ({
    login: (displayName, email, photoUrl) => {
        dipsatch.user.login({ displayName, email, photoUrl });
    },
});

export default connect(mapState, mapDispatch)(LogIn);
