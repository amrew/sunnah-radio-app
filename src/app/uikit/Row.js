// @flow
import * as React from 'react';
import {View} from 'react-native';

type Props = {
  children: React.Node,
  style?: {},
};

const Row = (props: Props) => (
  <View {...props} style={{...styles.row, ...props.style}} />
);

const styles = {
  row: {
    flexDirection: 'row',
  },
};

export default Row;
