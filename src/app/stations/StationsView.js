/**
 * @flow
 */

import * as React from 'react';
import {Text, View, FlatList} from 'react-native';
import {dispatch} from '@rematch/core';
import {connect} from 'react-redux';

import {SectionTitle} from '../uikit';
import type {FetchingState} from '../common/types';
import type {Stations} from './stationModel';
import type {CurrentlyPlaying} from '../audio/audioPlayerModel';
import AudioItem from '../audio/AudioItem';

type Props = {
  station: {
    items: Stations,
    status: FetchingState,
  },
  currentlyPlaying: CurrentlyPlaying,
  onRefresh: () => any,
};

class StationsView extends React.Component<Props> {
  handleItemPress = (audioID, audioUrl) => {
    dispatch.audioPlayer.setAudio({audioID, audioUrl});
  }

  keyExtractor = (item, index) => item.uid_rad;

  renderItem = ({item}) => {
    const {currentlyPlaying} = this.props;
    return (
      <AudioItem
        key={item.uid_rad}
        item={item}
        onItemPress={this.handleItemPress}
        isActive={item.uid_rad === currentlyPlaying.id}
        isPlaying={currentlyPlaying.status === 'PLAYING'}
      />
    );
  };

  render() {
    const {station} = this.props;
    return (
      <React.Fragment>
        {station.status.error && (
          <View key={'error'} style={styles.rowHeadLight}>
            <Text style={styles.textHeadLight}>Error...</Text>
          </View>
        )}
        <FlatList
          ListHeaderComponent={() => <SectionTitle title="SEMUA RADIO"/>}
          data={station.items}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          refreshing={!!station.status.loading}
          onRefresh={this.props.onRefresh}
        />
      </React.Fragment>
    );
  }
}

const styles = {
  rowHead: {
    padding: 24,
    backgroundColor: '#212121',
  },
  textHead: {
    color: '#FFF',
    fontSize: 16,
  },

  rowHeadLight: {
    padding: 24,
    flexDirection: 'row',
    backgroundColor: '#ccc',
  },
  textHeadLight: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.6,
    lineHeight: 24,
  },
  subTitle: {
    color: '#444',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.8,
    lineHeight: 21,
  },
};

const buildState = (ids, detailMapping) => {
  return ids.map(id => detailMapping[id]);
};

export default connect(({station, audioPlayer}) => {
  const stations = buildState(station.stationIds, station.stationMapping);
  return {
    currentlyPlaying: audioPlayer.currentlyPlaying,
    station: {
      items: stations,
      status: station.status,
    },
  };
})(StationsView);
