/**
 * @flow
 */

import * as React from 'react';
import {ScrollView, FlatList, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {dispatch} from '@rematch/core';
import {withNavigation, NavigationScreenProp} from 'react-navigation';

import StationsView from './StationsView';
import {Header, Page, Link, Box} from '../uikit';
import CurrentlyPlayingView from './CurrentlyPlayingView';

type Props = {
  navigation: NavigationScreenProp,
};

class StationsScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'Radio',
  };

  static async getInitialState() {
    return dispatch.station.fetchStations();
  }

  handleRefreshStations = () => {
    dispatch.station.fetchStations({shouldRefresh: true});
  };

  handleOpenDrawer = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <Page>
        <Header
          title={'Radio RII'}
          leftContent={
            <Link onPress={this.handleOpenDrawer}>
              <Box>
                <Icon name="md-menu" color="#FFF" size={24} />
              </Box>
            </Link>
          }
          rightContent={
            <Box>
              <Icon name="md-search" color="#FFF" size={24} />
            </Box>
          }
        />
        <StationsView onRefresh={this.handleRefreshStations} />
        <CurrentlyPlayingView />
      </Page>
    );
  }
}

export default withNavigation(StationsScreen);
