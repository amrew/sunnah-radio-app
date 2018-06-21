// @flow
import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PlayPauseButton from './PlayPauseButton';
import LinearGradient from 'react-native-linear-gradient';

import {Box} from '../uikit';

type Props = {
  title: string,
  subtitle: string,
  status: string,
  onPlayPause: () => any,
  onDetailPress: () => any,
};

class MiniAudioControl extends React.Component<Props> {
  render() {
    const {title, subtitle, status} = this.props;
    return (
      <LinearGradient colors={['#262630', '#25242e']} style={styles.container}>
        <PlayPauseButton
          status={status}
          onPlayPause={this.props.onPlayPause}
        />
        <TouchableOpacity
          style={{flexDirection: 'row', flex: 1}}
          activeOpacity={0.7}
          onPress={this.props.onDetailPress}>
          <Box flex={1} paddingRight={0}>
            <Text style={styles.audioTitle} numberOfLines={1}>
              <Text style={styles.boldText}>{title}</Text> - {subtitle}
            </Text>
          </Box>
          <Box>
            <Icon name={'ios-arrow-forward-outline'} color="#a2acbe" size={24} />
          </Box>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    elevation: 3,
  },
  audioTitle: {
    color: '#a2acbe',
    fontSize: 14,
    lineHeight: 24,
  },
  boldText: {
    fontWeight: 'bold',
  },
};

export default MiniAudioControl;
