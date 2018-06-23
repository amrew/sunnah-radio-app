// @flow
import * as React from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import {Box} from '../uikit';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  status: string,
  onPlayPause?: () => any,
};

class PlayPauseButton extends React.Component<Props> {
  render() {
    const {status} = this.props;
    const isPlaying = status === 'PLAYING';
    const isPaused = status === 'PAUSED';
    const isBuffering = status === 'BUFFERING';
    const isStopped = status === 'STOPPED';
    const isError = status === 'ERROR';

    const iconName = isPlaying ? 'md-pause' : 'md-play';
    return (
      <TouchableOpacity
        onPress={this.props.onPlayPause}
        style={{justifyContent: 'center'}}>
        <Box>
          {isPlaying || isPaused || isStopped ? (
            <Icon name={iconName} size={18} color={'#EDAD61'} />
          ) : isBuffering ? (
            <ActivityIndicator />
          ) : null}
        </Box>
      </TouchableOpacity>
    );
  }
}

export default PlayPauseButton;
