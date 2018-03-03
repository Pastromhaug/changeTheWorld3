import firebase from 'react-native-firebase';

export const messages = {
    state: [],
    reducers: {
        addMessage(state, payload) {
            let message = {
                text: payload.text,
                key: state.length.toString(),
                isFinal: payload.isFinal
            };
            return [message, ...state];
        },
        updateMessage(state, payload) {
            let newState = [...state];
            newState[0].text = payload.text;
            newState[0].isFinal = payload.isFinal;
            return newState;
        },
    },
    effects: {
        addOrUpdateMessageAsync(payload) {
            if (state.length === 0 || state[0].isFinal) {
                this.addMessage(payload);
            } else {
                this.updateMessage(payload);
            }
        },
    },
};
