export const messages = {
    state: [],
    reducers: {
        addOrUpdateMessage(state, payload) {
            if (state.length === 0 || state[0].isFinal) {
                const message = {
                    text: payload.text,
                    key: state.length.toString(),
                    isFinal: payload.isFinal
                };
                return [message, ...state];
            } else {
                let newState = [...state];
                newState[0].text = payload.text;
                newState[0].isFinal = payload.isFinal;
                return newState;
            }
        },
    },
    effects: {
        addOrUpdateMessageAsync(payload) {
            this.addOrUpdateMessage(payload);
        },
    },
};
