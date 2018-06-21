// @flow
import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  children: React.Node,
};

class Page extends React.Component<Props> {
  render() {
    return <View style={styles.container}>{this.props.children}</View>;
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
};

export default Page;
