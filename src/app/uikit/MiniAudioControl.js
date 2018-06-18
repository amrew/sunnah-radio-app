// @flow
import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Box from './Box';

type Props = {
  title: string,
  subtitle: string,
  isPlaying: boolean,
  onPlayPause: () => any,
  onDetailPress: () => any,
};

class MiniAudioControl extends React.Component<Props> {
  render() {
    const {title, subtitle, isPlaying} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onPlayPause}>
          <Box paddingRight={0}>
            <Icon
              name={isPlaying ? 'ios-pause' : 'ios-play'}
              color="#F15945"
              size={24}
            />
          </Box>
        </TouchableOpacity>
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
            <Icon name={'ios-arrow-forward-outline'} color="#333" size={24} />
          </Box>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    elevation: 3,
  },
  audioTitle: {
    color: '#333',
    fontSize: 14,
    lineHeight: 24,
  },
  boldText: {
    fontWeight: 'bold',
  },
};

export default MiniAudioControl;
