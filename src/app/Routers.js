/**
 * @flow
 */
import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import StationsScreen from './stations/StationsScreen';
import SettingsScreen from './settings/SettingsScreen';

export default createBottomTabNavigator(
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
