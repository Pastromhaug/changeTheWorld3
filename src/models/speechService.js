export const speechService = {
    state: {
        hearingVoice: false,
        connected: false,
    },
    reducers: {
        setConnected(state, payload) {
            return Object.assign({}, state, {
                connected: payload.isConnected,
            });
        },
        setHearingVoice(state, payload) {
            return Object.assign({}, state, {
                hearingVoice: payload.isHearingVoice,
            });
        },
    },
};
