import React from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Groups from './Groups';
import Monitor from './Monitor';
import Speech from './Speech';


const LoggedIn = StackNavigator(
    {
        Groups: { screen: Groups },
        Speech: { screen: Speech },
    }, {
        initialRouteName: 'Groups',
    }
);

export default () => {
    console.log('LoggedIn');
    return (
        <View>
            <Monitor />
            <LoggedIn />
        </View>
    );
};

