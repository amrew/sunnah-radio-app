/**
 * @flow
 */

import * as React from 'react';
import {Header} from '../uikit';
import {connect} from 'react-redux';
import type {Station} from './stationModel';

type Props = {
  station: Station,
};

class StationDetailHeader extends React.Component<Props> {
  render() {
    const {station} = this.props;
    return <Header title={station.name} />;
  }
}

export default connect(({station}, {id}) => {
  return {
    station: station.stationMapping[id],
  };
})(StationDetailHeader);
