// @flow
import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Box} from '../uikit';
import type {Station} from '../stations/stationModel';

class AudioItemPlaceholder extends React.Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', backgroundColor: '#fff'}}>
          <View style={styles.descriptionArea}>
            <Box paddingRight={0} justifyContent="center">
              <View style={styles.image} />
            </Box>
            <Box flex={1}>
              <View style={styles.titlePlaceholder} />
              <View style={styles.subTitlePlaceholder} />
              <View style={{...styles.subTitlePlaceholder, width: 150}} />
            </Box>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Box>
              <Icon name={'md-more'} size={24} color={'#262630'} />
            </Box>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  descriptionArea: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: 'rgba(38, 38, 48, .1)',
  },
  titlePlaceholder: {
    backgroundColor: 'rgba(38, 38, 48, .2)',
    marginBottom: 4,
    width: 200,
    height: 16,
  },
  subTitlePlaceholder: {
    backgroundColor: 'rgba(53, 69, 92, .1)',
    marginBottom: 4,
    width: 250,
    height: 12,
  },
};

export default AudioItemPlaceholder;
