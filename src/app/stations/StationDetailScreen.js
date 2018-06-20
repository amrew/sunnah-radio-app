/**
 * @flow
 */

import * as React from 'react';
import {ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {dispatch} from '@rematch/core';
import {withNavigation} from 'react-navigation';

import {Page} from '../uikit';
import StationDetailHeader from './StationDetailHeader';

type Props = {
  navigation: {
    getParam: (key: string) => any,
  },
};

class StationDetailScreen extends React.Component<Props> {
  render() {
    const {navigation} = this.props;
    return (
      <Page>
        <StationDetailHeader id={navigation.getParam('id')} />
      </Page>
    );
  }
}

export default withNavigation(StationDetailScreen);
