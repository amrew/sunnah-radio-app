import { AppRegistry } from 'react-native';
import startApp from './src/app/startApp';
import codePush from "react-native-code-push";

const RootComponent = startApp();

AppRegistry.registerComponent('SunnahRadio', () => codePush(RootComponent));
