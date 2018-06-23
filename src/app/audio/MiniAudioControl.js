// @flow
import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PlayPauseButton from './PlayPauseButton';
import LinearGradient from 'react-native-linear-gradient';

import {Box, Link} from '../uikit';

type Props = {
  title: string,
  subtitle: string,
  status: string,
  onPlayPause: () => any,
  onStop: () => any,
  onDetailPress: () => any,
};

class MiniAudioControl extends React.Component<Props> {
  render() {
    const {title, subtitle, status} = this.props;
    return (
      <LinearGradient colors={['#2e2e39', '#26252f']} style={styles.container}>
        <PlayPauseButton status={status} onPlayPause={this.props.onPlayPause} />
        <Link onPress={this.props.onStop} style={{justifyContent: 'center'}}>
          <Box>
            <Icon name={'ios-square'} color="#dd4141" size={18} />
          </Box>
        </Link>
        <Link
          style={{flexDirection: 'row', flex: 1}}
          onPress={this.props.onDetailPress}>
          <Box flex={1} paddingRight={0}>
            <Text style={styles.audioTitle} numberOfLines={1}>
              <Text style={styles.boldText}>{title}</Text> - {subtitle}
            </Text>
          </Box>
          <Box>
            <Icon
              name={'ios-arrow-forward-outline'}
              color="#a2acbe"
              size={24}
            />
          </Box>
        </Link>
      </LinearGradient>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    elevation: 1,
    borderTopWidth: 1,
    borderTopColor: '#383842',
  },
  audioTitle: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 24,
  },
  boldText: {
    fontWeight: 'bold',
  },
};

export default MiniAudioControl;
