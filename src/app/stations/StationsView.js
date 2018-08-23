/**
 * @flow
 */

import * as React from 'react';
import {Text, View, FlatList} from 'react-native';
import {dispatch} from '@rematch/core';
import {connect} from 'react-redux';
import Fuse from 'fuse.js';

import {SectionTitle, Link} from '../uikit';
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
  onPlayAudio: (audioID: string, audioUrl: string) => any,
};

class StationsView extends React.Component<Props> {
  handleReadMore = audioID => {
    const {modal} = this.props;
    const {currentlyPlaying} = this.props;
    modal.show(
      <StationDetailModal
        id={audioID}
        closeModal={modal.close}
        onPlayAudio={this.props.onPlayAudio}
      />
    );
  };

  keyExtractor = (item, index) => item.uuid;

  renderItem = ({item}: {item: Station}) => {
    const {currentlyPlaying} = this.props;
    return (
      <AudioItem
        key={item.id}
        item={item}
        onItemPress={this.props.onPlayAudio}
        isActive={item.id === currentlyPlaying.id}
        onReadMore={this.handleReadMore}
      />
    );
  };

  render() {
    const {station, searchKey} = this.props;
    const searcMode = typeof searchKey !== 'undefined';

    const sectionTitle = !searcMode && <SectionTitle title="SEMUA RADIO" />;
    const alreadyHasItems = station.items && station.items.length > 0;

    if (!station.status.loaded && !alreadyHasItems) {
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
              <Link
                onPress={this.props.onRefresh}
                key={'error'}
                style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  Maaf, radio tidak dapat dimuat.
                </Text>
              </Link>
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
  errorContainer: {
    padding: 24,
    flexDirection: 'row',
    backgroundColor: '#ccc',
  },
  errorText: {
    color: '#e45756',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.6,
    lineHeight: 24,
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
