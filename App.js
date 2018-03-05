
import React from 'react';
import { YellowBox } from 'react-native';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';

import LogIn from './src/components/LogIn';
import { messaging } from './src/models/messaging';
import { speechService } from './src/models/speechService';
import { user } from './src/models/user';

YellowBox.ignoreWarnings(['Deprecated firebase.User.prototype.signInWithCredential']);
YellowBox.ignoreWarnings(['Warning: componentWillMount is deprecated']);
YellowBox.ignoreWarnings(['Warning: componentWillReceiveProps is deprecated']);
YellowBox.ignoreWarnings(['Warning: componentWillUpdate is deprecated']);

const store = init({
    models: {
        messaging,
        speechService,
        user,
    },
});

export default () => (
    <Provider store={ store }>
        <LogIn />
    </Provider>
);
