/**
 * @flow
 */
import React from 'react';
import {InteractionManager, Text} from 'react-native';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import DrawerView from './common/DrawerView';

import StationsScreen from './stations/StationsScreen';
import StationDetailScreen from './stations/StationDetailScreen';
import SettingsScreen from './settings/SettingsScreen';

const StationNavigator = createStackNavigator(
  {
    Stations: StationsScreen,
    StationDetail: StationDetailScreen,
    Settings: SettingsScreen,
  },
  {
    headerMode: 'none',
  }
);

StationNavigator.navigationOptions = ({navigation}) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }
  return {
    drawerLockMode,
    title: 'Radio Streaming',
    drawerIcon: ({focused}) => {
      return (
        <Icon
          name={'md-microphone'}
          color={focused ? '#29718F' : '#35455C'}
          size={24}
        />
      );
    },
  };
};

const AppNavigator = createDrawerNavigator(
  {
    Stations: StationNavigator,
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        drawerIcon: ({focused}) => {
          return (
            <Icon
              name={'md-settings'}
              color={focused ? '#29718F' : '#35455C'}
              size={24}
            />
          );
        },
      },
    },
  },
  {
    contentComponent: DrawerView,
    contentOptions: {
      activeTintColor: '#29718F',
      inactiveTintColor: '#35455C',
    },
  }
);

// gets the current screen from navigation state
const getActiveRoute = (navigationState, router) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  const {getComponentForRouteName} = router;
  const screen = getComponentForRouteName(route.routeName);
  if (route.routes) {
    return getActiveRoute(route, screen.router);
  }
  return {...route, screen};
};

type RouterConfig = {
  onStateChange: (currentScreen: any, prevScreen: any) => any,
};

export default (routerConfig: RouterConfig) => {
  return class Router extends React.Component<{}> {
    navigator: any;
    isTransitioning: boolean;

    componentDidMount() {
      const {nav} = this.navigator.state;
      const {router} = AppNavigator;
      const currentRoute = getActiveRoute(nav, router);
      routerConfig.onStateChange(currentRoute, null);
    }

    render() {
      return (
        <AppNavigator
          ref={navigator => (this.navigator = navigator)}
          onNavigationStateChange={(prevState, currentState) => {
            const {router} = AppNavigator;
            const currentRoute = getActiveRoute(currentState, router);
            const prevRoute = getActiveRoute(prevState, router);
            if (!this.isTransitioning) {
              this.isTransitioning = true;
              routerConfig.onStateChange(currentRoute, prevRoute);
              InteractionManager.runAfterInteractions(() => {
                this.isTransitioning = false;
              });
            }
          }}
        />
      );
    }
  };
};
