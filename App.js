import { YellowBox } from 'react-native';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { messaging } from './src/models/messaging';
import { speechService } from './src/models/speechService';
import { user } from './src/models/user';
import { registerScreens } from './src/screens';


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

registerScreens(store, Provider);

Navigation.events().onAppLaunched(() => {
  Navigation.setRoot({
  stack: {
    options: {
      topBar: {
        hidden: false,
      },
    },
    children: [
      {
        component: {
          name: 'LogIn',
        },
      },
    ],
  },
});
});
