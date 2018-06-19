/**
 * @flow
 */

import * as React from 'react';
import {ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StationsView from './StationsView';
import {dispatch} from '@rematch/core';

import {Header, Page} from '../uikit';
import CurrentlyPlayingView from './CurrentlyPlayingView';

type Props = {};

class StationsScreen extends React.Component<Props> {
  static navigationOptions = () => {
    return {
      tabBarLabel: 'RADIO',
    };
  };

  static async getInitialState() {
    return dispatch.station.fetchStations();
  };

  componentWillUnmount() {
    dispatch.audioPlayer.stop();
  }

  handleRefreshStations = () => {
    dispatch.station.fetchStations({shouldRefresh: true});
  };

  render() {
    return (
      <Page>
        <Header
          title={'Radio RII'}
          leftContent={<Icon name="md-search" color="#FFF" size={24} />}
        />
        <CurrentlyPlayingView />
        <StationsView onRefresh={this.handleRefreshStations} />
      </Page>
    );
  }
}

export default StationsScreen;
