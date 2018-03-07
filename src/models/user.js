import firebase from 'react-native-firebase';
import GoogleSignIn from '../native_modules/googleSignIn';


export const user = {
    state: {
        loading: false,
        loggedIn: false,
        displayName: null,
        email: null,
        photoUrl: null,
        firebaseId: null,
    },
    reducers: {
        signIn(state, payload) {
            return Object.assign({}, state, {
                loading: false,
                loggedIn: true,
                displayName: payload.displayName,
                email: payload.email,
                photoUrl: payload.photoUrl,
                firebaseId: payload.firebaseId,
            });
        },
        loading(state) {
            return Object.assign({}, state, {
                loading: true,
            });
        },
    },
    effects: {
        async signInGoogle() {
            this.loading();
            await GoogleSignIn.configure({});
            const googleUser = await GoogleSignIn.signIn();
            console.log('googleSignIn user: ', googleUser);
        },
        async signInFirebase(payload) {
            // firebase sign in
            const credential = firebase.auth.GoogleAuthProvider.credential(
                payload.idToken,
                payload.accessToken,
            );
            const firebaseUser = await firebase.auth().signInWithCredential(credential);
            console.log('firebaseSignIn user: ', JSON.stringify(firebaseUser.toJSON()));
        },
    },
};
