import firebase from 'react-native-firebase';

export const messaging = {
    state: {
        messages: [],
        messagesRef: firebase.database().ref('messages'),
        lastMessageKey: null,
        isFinal: true,
    },
    reducers: {
        sendMessage(state, payload) {
            let ref = firebase.database().ref('messages');
            if (state.isFinal) {
                ref = ref.push();
            } else {
                ref = ref.child(state.lastMessageKey);
            }
            const msg = {
                text: payload.text,
                key: ref.key,
                sortOrder: state.incrementer,
                time: Date.now(),
            };
            ref.set(msg);
            return Object.assign({}, state, {
                lastMessageKey: ref.key,
                isFinal: payload.isFinal,
            });
        },
        receiveMessages(state, payload) {
            return Object.assign({}, state, {
                messages: payload.messages,
            });
        },
    },
};
