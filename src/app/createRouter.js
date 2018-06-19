/**
 * @flow
 */
import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import StationsScreen from './stations/StationsScreen';
import SettingsScreen from './settings/SettingsScreen';

const AppNavigator = createBottomTabNavigator(
  {
    Stations: StationsScreen,
    Settings: SettingsScreen,
  },
  {
    navigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Stations') {
          iconName = 'md-microphone';
        } else if (routeName === 'Settings') {
          iconName = 'md-settings';
        }
        return (
          <Icon
            name={iconName}
            size={24}
            color={focused ? '#FFF' : 'rgba(255, 255, 255, .7)'}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FFF',
      inactiveTintColor: 'rgba(255, 255, 255, .8)',
      style: {
        backgroundColor: '#cc2f58',
        height: 54,
      },
    },
  }
);

const {
  router: {getComponentForRouteName},
} = AppNavigator;

// gets the current screen from navigation state
const getActiveRoute = navigationState => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRoute(route);
  }
  return {...route, screen: getComponentForRouteName(route.routeName)};
};

type RouterConfig = {
  onStateChange: (currentScreen: any, prevScreen: any) => any,
};

export default (routerConfig: RouterConfig) => {
  return class Router extends React.Component<{}> {
    navigator: any;

    componentDidMount() {
      const {nav} = this.navigator.state;
      const currentRoute = getActiveRoute(nav);
      routerConfig.onStateChange(currentRoute, null);
    }

    render() {
      return (
        <AppNavigator
          ref={navigator => (this.navigator = navigator)}
          onNavigationStateChange={(prevState, currentState) => {
            const currentRoute = getActiveRoute(currentState);
            const prevRoute = getActiveRoute(prevState);
            routerConfig.onStateChange(currentRoute, prevRoute);
          }}
        />
      );
    }
  };
};
