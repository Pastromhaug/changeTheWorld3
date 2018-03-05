export const user = {
    state: {
        loading: true,
        loggedIn: false,
        displayName: null,
        email: null,
        photoUrl: null,
    },
    reducer: {
        login(state, payload) {
            return Object.assign({}, state, {
                loading: false,
                loggedIn: true,
                displayName: payload.displayName,
                email: payload.email,
                photoUrl: payload.photoUrl,
            });
        },
    },
};
