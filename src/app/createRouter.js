/**
 * @flow
 */
import React from 'react';
import {InteractionManager} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import StationsScreen from './stations/StationsScreen';
import StationDetailScreen from './stations/StationDetailScreen';
import SettingsScreen from './settings/SettingsScreen';

const StationNavigator = createStackNavigator(
  {
    Stations: StationsScreen,
    StationDetail: StationDetailScreen,
  },
  {
    headerMode: 'none',
  }
);

StationNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const AppNavigator = createBottomTabNavigator(
  {
    Stations: StationNavigator,
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
