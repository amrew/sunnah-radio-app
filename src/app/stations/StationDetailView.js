/**
 * @flow
 */

import * as React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import {Box} from '../uikit';
import AudioItem from '../audio/AudioItem';
import type {Station} from './stationModel';
import type {CurrentlyPlaying} from '../audio/audioPlayerModel';

type Props = {
  station: Station,
  currentlyPlaying: CurrentlyPlaying,
};

class StationDetailView extends React.Component<Props> {
  render() {
    const {station, currentlyPlaying} = this.props;
    return (
      <Box>
        <AudioItem
          item={station}
          isActive={station.id === currentlyPlaying.id}
        />
      </Box>
    );
  }
}

export default connect(({station, audioPlayer}, {stationId}) => ({
  station: station.stationMapping[stationId],
  currentlyPlaying: audioPlayer.currentlyPlaying,
}))(StationDetailView);
