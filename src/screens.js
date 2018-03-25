import { Navigation } from 'react-native-navigation';

import LogIn from './components/LogIn';
import LoggedIn from './components/LoggedIn';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('LoggedIn', () => LoggedIn, store, Provider);
    Navigation.registerComponent('LogIn', () => LogIn, store, Provider);
}
