// @flow
import * as React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

import Box from './Box';

type Props = {
  title: string,
  rightContent: React.Node,
}

class Header extends React.Component<Props> {
  render() {
    const {title, rightContent} = this.props;
    return (
      <View style={styles.header}>
        <StatusBar backgroundColor="#D7335D" />
        <Box flex={1}>
          <Text style={styles.headerTitle}>{title}</Text>
        </Box>
        {rightContent && <Box>{rightContent}</Box>}
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
