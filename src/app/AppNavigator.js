/**
 * @flow
 */
import React from 'react';
import {InteractionManager, Text} from 'react-native';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import DrawerView from './common/DrawerView';

import StationsScreen from './stations/StationsScreen';
import StationSearchScreen from './stations/StationSearchScreen';
import StationDetailScreen from './stations/StationDetailScreen';
import SettingsScreen from './settings/SettingsScreen';

const StationNavigator = createStackNavigator(
  {
    Stations: StationsScreen,
    StationDetail: StationDetailScreen,
    Settings: SettingsScreen,
    StationSearch: StationSearchScreen,
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
          color={focused ? '#2f2f3a' : '#35455C'}
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
              color={focused ? '#2f2f3a' : '#35455C'}
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
      activeTintColor: '#2f2f3a',
      inactiveTintColor: '#35455C',
    },
  }
);

export default AppNavigator;