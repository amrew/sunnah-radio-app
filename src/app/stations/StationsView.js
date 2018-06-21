/**
 * @flow
 */

import * as React from 'react';
import {Text, View, FlatList} from 'react-native';
import {dispatch} from '@rematch/core';
import {connect} from 'react-redux';

import {SectionTitle} from '../uikit';
import type {FetchingState} from '../common/types';
import type {Stations, Station} from './stationModel';
import type {CurrentlyPlaying} from '../audio/audioPlayerModel';
import AudioItem from '../audio/AudioItem';
import withModal from '../libs/withModal';
import type {ModalProps} from '../libs/withModal';
import StationDetailModal from '../stations/StationDetailModal';

type Props = {
  station: {
    items: Stations,
    status: FetchingState,
  },
  currentlyPlaying: CurrentlyPlaying,
  onRefresh: () => any,
  modal: ModalProps,
};

class StationsView extends React.Component<Props> {
  handleItemPress = (audioID, audioUrl) => {
    dispatch.audioPlayer.setAudio({audioID, audioUrl});
  };

  handleReadMore = audioID => {
    const {modal} = this.props;
    const {currentlyPlaying} = this.props;
    modal.show(<StationDetailModal id={audioID} />);
  };

  keyExtractor = (item, index) => item.id;

  renderItem = ({item}: {item: Station}) => {
    const {currentlyPlaying} = this.props;
    return (
      <AudioItem
        key={item.id}
        item={item}
        onItemPress={this.handleItemPress}
        isActive={item.id === currentlyPlaying.id}
        onReadMore={this.handleReadMore}
      />
    );
  };

  render() {
    const {station} = this.props;
    return (
      <FlatList
        style={{flex: 1}}
        ListHeaderComponent={() => (
          <React.Fragment>
            <SectionTitle title="SEMUA RADIO" />
            {station.status.error && (
              <View key={'error'} style={styles.rowHeadLight}>
                <Text style={styles.textHeadLight}>Error...</Text>
              </View>
            )}
          </React.Fragment>
        )}
        data={station.items}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        refreshing={!!station.status.loading}
        onRefresh={this.props.onRefresh}
      />
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
})(withModal(StationsView));
