import firebase from 'react-native-firebase';

export const messaging = {
    state: {
        groups: {},
        messages: [],
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
            console.log('received messages')
            console.log(messages)
            return Object.assign({}, state, {
                messages,
            });
        },
        receiveGroup(state, payload) {
            console.log('received group')
            console.log(payload.group)
            group_update = {}
            group_update[payload.group.key] = payload.group
            const groups = Object.assign({}, state.groups, group_update)
            const newState = Object.assign({}, state, { groups })
            console.log('new group state')
            console.log(newState)
            return newState
        }
    },
};
