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

    let iconName = isPlaying ? 'md-pause' : 'md-play';
    if (isError) {
      iconName = 'md-alert';
    }
    return (
      <TouchableOpacity
        onPress={this.props.onPlayPause}
        style={{justifyContent: 'center'}}>
        <Box>
          {isPlaying || isPaused || isStopped || isError ? (
            <Icon name={iconName} size={18} color={'#FFF'} />
          ) : isBuffering ? (
            <ActivityIndicator />
          ) : null}
        </Box>
      </TouchableOpacity>
    );
  }
}

export default PlayPauseButton;
