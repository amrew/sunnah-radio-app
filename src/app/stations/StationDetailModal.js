// @flow
import * as React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import type {Station} from './stationModel';
import AudioItem from '../audio/AudioItem';

import {Box} from '../uikit';

type Props = {
  station: Station,
};

class StationDetailModal extends React.Component<Props> {
  render() {
    const {station} = this.props;
    return (
      <View style={styles.container}>
        <AudioItem item={station} />
        <View>
          <Box>
            <Text style={styles.actionText}>Jadikan Favorit</Text>
          </Box>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 6,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
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
  actionText: {
    color: '#666',
  },
  borderLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
};

export default connect(({station}, {id}) => {
  return {
    station: station.stationMapping[id],
  };
})(StationDetailModal);
