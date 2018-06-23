/**
 * @flow
 */

import * as React from 'react';
import {Header, Link, Box} from '../uikit';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import type {Station} from './stationModel';

type Props = {
  station: Station,
};

class StationDetailHeader extends React.Component<Props> {
  render() {
    const {station} = this.props;
    return <Header title={station.name} hasHistory={true} />;
  }
}

export default connect(({station}, {stationId}) => {
  return {
    station: station.stationMapping[stationId],
  };
})(StationDetailHeader);
