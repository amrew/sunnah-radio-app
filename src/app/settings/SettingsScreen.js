/**
 * @flow
 */

import React, {Component} from 'react';
import {Text, View, StatusBar, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';

import {Header, Page} from '../uikit';

type Props = {};

class SettingsScreen extends Component<Props> {
  static navigationOptions = () => {
    return {
      tabBarLabel: 'PENGATURAN',
    };
  };

  render() {
    return (
      <Page>
        <Header title="Pengaturan" />
        <ScrollView />
      </Page>
    );
  }
}

export default SettingsScreen;
