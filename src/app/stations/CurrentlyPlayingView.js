// @flow
import * as React from 'react';
import {connect} from 'react-redux';
import {dispatch} from '@rematch/core';

import MiniAudioControl from '../audio/MiniAudioControl';
import type {CurrentlyPlaying} from '../audio/audioPlayerModel';
import type {Station} from '../stations/stationModel';
import {withNavigation} from 'react-navigation';

type Props = {
  currentlyPlaying: CurrentlyPlaying,
  station: Station,
  navigation: {
    navigate: (key: string, params: any) => any,
  },
};

class CurrentlyPlayingView extends React.Component<Props> {
  handlePlayPause = () => {
    const {currentlyPlaying} = this.props;
    if (currentlyPlaying.status === 'PLAYING') {
      dispatch.audioPlayer.pause();
    } else {
      dispatch.audioPlayer.play();
    }
  };

  handleDetailPress = id => {
    const {navigation, currentlyPlaying} = this.props;
    navigation.navigate('StationDetail', {id: currentlyPlaying.id});
  };

  render() {
    const {currentlyPlaying, station} = this.props;
    if (currentlyPlaying.id) {
      return (
        <MiniAudioControl
          title={station.name}
          subtitle={station.currentLesson}
          status={currentlyPlaying.status}
          onPlayPause={this.handlePlayPause}
          onDetailPress={this.handleDetailPress}
        />
      );
    }
    return null;
  }
}

export default connect(({audioPlayer, station}) => ({
  currentlyPlaying: audioPlayer.currentlyPlaying,
  station: station.stationMapping[audioPlayer.currentlyPlaying.id] || {},
}))(withNavigation(CurrentlyPlayingView));
