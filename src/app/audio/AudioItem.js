// @flow
import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Box} from '../uikit';
import type {Station} from '../stations/stationModel';

type Props = {
  item: Station,
  isActive: boolean,
  isPlaying: boolean,
  onItemPress: (audioID: string, audioUrl: string) => any,
};

class AudioItem extends React.Component<Props> {
  render() {
    const {item, isActive, isPlaying} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => {
          this.props.onItemPress(item.id, item.url);
        }}
        style={styles.container}>
        <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
          <Box paddingRight={0} justifyContent="center">
            <Image source={{uri: item.logo}} style={styles.image} />
          </Box>
          <Box flex={1}>
            <Text style={styles.titleText} numberOfLines={1}>
              {item.name.toUpperCase()}
            </Text>
            <Text style={styles.subTitle} numberOfLines={2}>
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
          <Box paddingLeft={0} justifyContent="center">
            <Icon name={'md-headset'} size={18} color={'#EA9433'} />
            <Text style={{textAlign: 'center', fontSize: 12}}>
              {item.listener}
            </Text>
          </Box>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#fff',
    marginVertical: 12,
    marginHorizontal: 8,
    marginBottom: 1,
    borderRadius: 4,
    elevation: 1,
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
