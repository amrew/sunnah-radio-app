// @flow
import * as React from 'react';
import {connect} from 'react-redux';
import {dispatch} from '@rematch/core';

import MiniAudioControl from '../audio/MiniAudioControl';
import type {CurrentlyPlaying} from '../audio/audioPlayerModel';
import type {Station} from '../stations/stationModel';

type Props = {
  currentlyPlaying: CurrentlyPlaying,
  station: Station,
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

  render() {
    const {currentlyPlaying, station} = this.props;
    if (currentlyPlaying.id) {
      return (
        <MiniAudioControl
          title={station.name}
          subtitle={station.currentLesson}
          isPlaying={currentlyPlaying.status === 'PLAYING'}
          onPlayPause={this.handlePlayPause}
          onDetailPress={() => {}}
        />
      );
    }
    return null;
  }
}

export default connect(({audioPlayer, station}) => ({
  currentlyPlaying: audioPlayer.currentlyPlaying,
  station: station.stationMapping[audioPlayer.currentlyPlaying.id] || {},
}))(CurrentlyPlayingView);
