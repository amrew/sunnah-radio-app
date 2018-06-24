// @flow
import * as React from 'react';
import {View} from 'react-native';

type Props = {
  children?: React.Node,
  style?: {},
  width?: number,
};

const Col = (props: Props) => (
  <View
    {...props}
    style={{
      ...(props.width ? {width: props.width} : styles.col),
      ...props.style,
    }}
  />
);

const styles = {
  col: {
    flex: 1,
  },
};

export default Col;
