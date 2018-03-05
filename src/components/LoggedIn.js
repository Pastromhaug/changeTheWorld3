import React from 'react';
import { View } from 'react-native';

import Monitor from './Monitor';
import Speech from './Speech';

export default () => {
    console.log('LoggedIn');
    return (
        <View>
            <Monitor />
            <Speech />
        </View>
    );
};

