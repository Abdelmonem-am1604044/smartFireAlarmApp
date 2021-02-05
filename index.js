/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { notification } from './src/NotificationManager';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
notification.configure();

AppRegistry.registerComponent(appName, () => App);
