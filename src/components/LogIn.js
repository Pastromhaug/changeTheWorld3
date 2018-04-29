
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import LoggedOut from './LoggedOut';
import LoggedIn from './LoggedIn';


class LogIn extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            console.log('onAuthStateChanged: ');
            console.log(user)
            console.log(
                user._user.displayName,
                user._user.email,
                user._user.photoUrl,
                user._user.uid
            )
            if (user) {
                this.props.login({
                    displayName: user._user.displayName,
                    email :user._user.email,
                    photoUrl: user._user.photoUrl,
                    uid: user._user.uid,
                });
            }
        });
    }
    componentWillUnmount() {
        this.authSubscription();
    }
    render() {
        const { navigate } = this.props.navigation;
        if (this.props.loggedIn) {
            navigate('LoggedIn')
            return null;
        };
        navigate('LoggedOut');
        return null;
    }
}

const mapState = state => ({
    loggedIn: state.user.loggedIn,
});

const mapDispatch = dispatch => ({
    login: dispatch.user.login
});

export default connect(mapState, mapDispatch)(LogIn);
