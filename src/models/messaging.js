import firebase from 'react-native-firebase';

export const messaging = {
    state: {
        groups: {},
        current_group: null,
        messages: [],
        lastMessageKey: null,
        isFinal: true,
    },
    reducers: {
        sendMessage(state, payload) {
            let ref = firebase.database().ref('groups/' + state.current_group + '/messages');
            if (state.isFinal) {
                ref = ref.push();
            } else {
                ref = ref.child(state.lastMessageKey);
            }
            const msg = {
                text: payload.text,
                key: ref.key,
                time: Date.now(),
                user: payload.user,
            };
            ref.set(msg);
            return Object.assign({}, state, {
                lastMessageKey: ref.key,
                isFinal: payload.isFinal,
            });
        },
        receiveMessages(state, payload) {
            const messages = payload.messages.sort((a, b) => b.time - a.time);
            return Object.assign({}, state, {
                messages,
            });
        },
        receiveGroup(state, payload) {
            group_update = {}
            group_update[payload.group.key] = payload.group
            const groups = Object.assign({}, state.groups, group_update)
            const newState = Object.assign({}, state, { groups })
            return newState
        },
        setCurrentGroup(state, payload) {
            console.log('set current group', payload)
            return Object.assign({}, state, {current_group: payload.current_group})
        }
    },
};
