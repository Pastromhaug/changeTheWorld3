
import React from 'react';
import { YellowBox } from 'react-native';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';

import LoggedOut from './src/components/LoggedOut';
import Speech from './src/components/Speech';
import Groups from './src/components/Groups';
import { messaging } from './src/models/messaging';
import { user } from './src/models/user';

YellowBox.ignoreWarnings(['Deprecated firebase.User.prototype.signInWithCredential']);
YellowBox.ignoreWarnings(['Warning: componentWillMount is deprecated']);
YellowBox.ignoreWarnings(['Warning: componentWillReceiveProps is deprecated']);
YellowBox.ignoreWarnings(['Warning: componentWillUpdate is deprecated']);

const store = init({
    models: {
        messaging,
        user,
    },
});

const AppStack = StackNavigator({
        Groups: { screen: Groups },
        Speech: { screen: Speech },
    }, {
        initialRouteName: 'Groups',
    }
)

const AuthStack = StackNavigator({ LoggeOut: LoggedOut });

const Root = SwitchNavigator({
        App: { screen: AppStack },
        Auth: { screen: AuthStack },
    }, {
        initialRouteName: 'Auth',
    }
);

export default () => (
    <Provider store={ store }>
        <Root/>
    </Provider>
);
