/**
 * @flow
 */

import * as React from 'react';
import {Text, View, FlatList} from 'react-native';
import {dispatch} from '@rematch/core';
import {connect} from 'react-redux';
import Fuse from 'fuse.js';

import {SectionTitle} from '../uikit';
import type {FetchingState} from '../common/types';
import type {Stations, Station} from './stationModel';
import type {CurrentlyPlaying} from '../audio/audioPlayerModel';
import AudioItem from '../audio/AudioItem';
import AudioItemPlaceholder from '../audio/AudioItemPlaceholder';
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
  searchKey: ?string,
  onItemPress: (audioID: string, audioUrl: string) => any,
};

class StationsView extends React.Component<Props> {
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
        onItemPress={this.props.onItemPress}
        isActive={item.id === currentlyPlaying.id}
        onReadMore={this.handleReadMore}
      />
    );
  };

  render() {
    const {station, searchKey} = this.props;
    const searcMode = typeof searchKey !== 'undefined';

    const sectionTitle = !searcMode && <SectionTitle title="SEMUA RADIO" />;

    if (!station.status.loaded) {
      return (
        <View>
          {sectionTitle}
          <AudioItemPlaceholder />
          <AudioItemPlaceholder />
          <AudioItemPlaceholder />
        </View>
      );
    }

    let items;
    if (searcMode) {
      const options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['name', 'currentLesson', 'region', 'province'],
      };
      const fuse = new Fuse(station.items, options);
      items = fuse.search(searchKey);
    } else {
      items = station.items;
    }

    return (
      <FlatList
        style={{flex: 1}}
        ListHeaderComponent={() => (
          <React.Fragment>
            {sectionTitle}
            {station.status.error && (
              <View key={'error'} style={styles.rowHeadLight}>
                <Text style={styles.textHeadLight}>Error...</Text>
              </View>
            )}
          </React.Fragment>
        )}
        data={items}
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
