export const user = {
    state: {
        loggedIn: false,
        displayName: null,
        email: null,
        photoUrl: null,
    },
    reducers: {
        login(state, payload) {
            return {
                loggedIn: true,
                displayName: payload.displayName,
                email: payload.email,
                photoUrl: payload.photoUrl,
            };
        },
    },
};
