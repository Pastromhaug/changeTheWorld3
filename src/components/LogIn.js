
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import LoggedOut from './LoggedOut';


class LogIn extends Component {
    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            console.log('onAuthStateChanged: ');
            console.log(user)
            if (user) {
                this.props.login(
                    user.displayName,
                    user.email,
                    user.photoUrl,
                    user.uid,
                );
                this.props.navigator.push({
                    screen: 'LoggedIn',
                    title: 'LoggedIn',
                });
            }
        });
    }
    componentWillUnmount() {
        // this.authSubscription();
    }
    render() {
    //     if (this.props.loggedIn) {
    //         this.props.navigator.push({
    //             screen: 'LoggedIn',
    //             title: 'LoggedIn',
    //         });
    //         console.log('navigate to LoggedIn');
    //     } else {
    //         console.log('logged out');
    //     }

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
