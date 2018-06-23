/**
 * @flow
 */

import * as React from 'react';
import {ScrollView, FlatList, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {dispatch} from '@rematch/core';
import {withNavigation, NavigationScreenProp} from 'react-navigation';

import StationsView from './StationsView';
import {Header, Page, Link, Box} from '../uikit';
import CurrentlyPlayingView from './CurrentlyPlayingView';

type Props = {
  navigation: NavigationScreenProp,
};

type States = {
  searchKey: ?string,
};

class StationSearchScreen extends React.Component<Props, States> {
  input: TextInput;

  static async getInitialState() {
    return dispatch.station.fetchStations();
  }

  state = {
    searchKey: '',
  };

  componentDidMount() {
    setTimeout(() => {
      this.input.focus();
    }, 0);
  }

  handleInputChange = searchKey => {
    this.setState({searchKey});
  };

  handleItemPress = (audioID, audioUrl) => {
    dispatch.audioPlayer.setAudio({audioID, audioUrl});
    setTimeout(() => {
      this.props.navigation.goBack();
    }, 0);
  };

  render() {
    return (
      <Page>
        <Header
          hasHistory={true}
          backgroundWhite
          centerContent={(
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TextInput
                ref={ref => this.input = ref}
                onChangeText={this.handleInputChange} 
                underlineColorAndroid="transparent"
                style={{color: '#262630'}}
              />
            </View>
          )}
        />
        <StationsView 
          searchKey={this.state.searchKey} 
          onItemPress={this.handleItemPress}
        />
      </Page>
    );
  }
}

export default withNavigation(StationSearchScreen);
