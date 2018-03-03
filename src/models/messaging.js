import firebase from 'react-native-firebase';

export const messaging = {
    state: {
        messages: [],
        // messagesRef: firebase.database().ref('messages'),
        lastMessageRef: null,
        isFinal: true,
    },
    reducers: {
        addOrUpdateMessage(state, payload) {
            let newState = Object.assign({}, state);
            if (!newState.isFinal) {
                newState.messages = newState.messages.slice(1);
            }
            newState.messages = [{
                text: payload.text,
                key: newState.messages.length.toString(),
            }, ...newState.messages];
            newState.isFinal = payload.isFinal;
            return newState;
        },
    },
    effects: {
        addOrUpdateMessageAsync(payload) {
            this.addOrUpdateMessage(payload);
        },
    },
};
