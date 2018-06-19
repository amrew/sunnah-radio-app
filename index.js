import { AppRegistry } from 'react-native';
import startApp from './src/app/startApp';

const RootComponent = startApp();

AppRegistry.registerComponent('SunnahRadio', () => RootComponent);
