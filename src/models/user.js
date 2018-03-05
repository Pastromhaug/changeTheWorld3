export const user = {
    state: {
        loggedIn: false,
        displayName: null,
        email: null,
        photoUrl: null,
    },
    reducer: {
        login(state, payload) {
            return Object.assign({}, state, {
                loggedIn: true,
                displayName: payload.displayName,
                email: payload.email,
                photoUrl: payload.photoUrl,
            });
        },
    },
};
