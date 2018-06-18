// @flow
import * as React from 'react';
import {View, Text} from 'react-native';

type Props = {
  children: React.Node,
  style?: {},
};

class Box extends React.Component<Props> {
  render() {
    const {children, style, ...validProps} = this.props;
    const boxStyle = {
      padding: 16,
      ...style,
      ...validProps,
    };
    return <View style={boxStyle}>{children}</View>;
  }
}

export default Box;
