// @flow
import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Box} from '../uikit';
import type {Station} from '../stations/stationModel';

type Props = {
  item: Station,
  isActive: boolean,
  isPlaying?: boolean,
  onItemPress?: (audioID: string, audioUrl: string) => any,
  onReadMore?: (audioID: string) => any,
};

class AudioItem extends React.Component<Props> {
  static defaultProps = {
    isActive: false,
  };

  handlePlayPause = () => {
    const {item, onItemPress} = this.props;
    onItemPress && onItemPress(item.id, item.url);
  };

  handleReadMorePress = () => {
    const {item, onReadMore} = this.props;
    onReadMore && onReadMore(item.id);
  };

  render() {
    const {item, isActive, isPlaying, onReadMore} = this.props;
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={this.handlePlayPause}
            style={{flex: 1, flexDirection: 'row'}}>
            <Box paddingRight={0} justifyContent="center">
              <Image source={{uri: item.logo}} style={styles.image} />
            </Box>
            <Box flex={1}>
              <Text style={styles.titleText} numberOfLines={1}>
                {item.name.toUpperCase()}
              </Text>
              <Text
                style={styles.subTitle}
                numberOfLines={onReadMore ? 2 : null}>
                {item.currentLesson}
              </Text>
            </Box>
            {isActive && (
              <Box paddingLeft={0} justifyContent="center">
                <Icon
                  name={isPlaying ? 'md-pause' : 'md-play'}
                  size={18}
                  color={'#EA9433'}
                />
              </Box>
            )}
          </TouchableOpacity>
          {onReadMore && (
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={this.handleReadMorePress}
              style={{justifyContent: 'center'}}>
              <Box paddingLeft={0}>
                <Icon name={'md-more'} size={24} color={'#212121'} />
              </Box>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#fff',
    marginBottom: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  titleText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  subTitle: {
    color: '#666',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
};

export default AudioItem;
