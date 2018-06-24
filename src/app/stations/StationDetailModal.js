// @flow
import * as React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import type {Station} from './stationModel';
import AudioItem from '../audio/AudioItem';

import {Box, Link, Row, Col, Icon} from '../uikit';

type Props = {
  station: Station,
  closeModal: (callback: any) => any,
  onPlayAudio: (audioId: string, audioUrl: string) => any
};

class StationDetailModal extends React.Component<Props> {
  render() {
    const {station} = this.props;
    const menus = [
      {
        title: 'Putar',
        icon: 'md-play',
        onPress: () => {
          this.props.closeModal(() => {
            this.props.onPlayAudio(station.id, station.url);
          });
        },
      },
      {
        title: 'Lihat Detail',
        icon: 'md-alert',
        link: {
          to: 'StationDetail',
          params: {id: station.id},
        },
        onPress: () => {
          this.props.closeModal();
        }
      },
      {
        title: 'Jadikan Favorit',
        icon: 'md-heart',
        onPress: () => {
          this.props.closeModal();
        }
      },
      {
        title: 'Tutup',
        icon: 'md-close',
        onPress: () => {
          this.props.closeModal();
        },
      },
    ];
    return (
      <View style={styles.container}>
        <AudioItem item={station} />
        <View>
          {menus.map((item, index) => (
            <Link
              key={index}
              {...(item.link ? item.link : {})}
              onPress={item.onPress ? item.onPress : null}>
              <Row>
                <Box justifyContent={'center'} alignItems={'center'} width={56}>
                  <Icon name={item.icon} color={'#888'} size={24} />
                </Box>
                <Box justifyContent={'center'}>
                  <Text style={styles.actionText}>{item.title}</Text>
                </Box>
              </Row>
            </Link>
          ))}
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
  actionText: {
    color: '#35455C',
  },
};

export default connect(({station}, {id}) => {
  return {
    station: station.stationMapping[id],
  };
})(StationDetailModal);
