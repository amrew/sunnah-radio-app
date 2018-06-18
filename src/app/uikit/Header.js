// @flow
import * as React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

import Box from './Box';

type Props = {
  title: string,
  leftContent: React.Node,
}

class Header extends React.Component<Props> {
  render() {
    const {title, leftContent} = this.props;
    return (
      <View style={styles.header}>
        <StatusBar backgroundColor="#D7335D" />
        <Box flex={1}>
          <Text style={styles.headerTitle}>{title}</Text>
        </Box>
        {leftContent && <Box>{leftContent}</Box>}
      </View>
    );
  }
}

const styles = {
  header: {
    flexDirection: 'row',
    height: 54,
    backgroundColor: '#D7335D',
    elevation: 3,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1,
  },
};

export default Header;
