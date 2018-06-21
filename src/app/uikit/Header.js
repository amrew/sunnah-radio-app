// @flow
import * as React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Box from './Box';

type Props = {
  title: string,
  rightContent: React.Node,
  leftContent: React.Node,
};

class Header extends React.Component<Props> {
  render() {
    const {title, rightContent, leftContent} = this.props;
    return (
      <LinearGradient colors={['#e35150', '#e14a4a']} style={styles.header}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        {leftContent}
        <Box flex={1}>
          <Text style={styles.headerTitle}>{title}</Text>
        </Box>
        {rightContent}
      </LinearGradient>
    );
  }
}

const styles = {
  header: {
    flexDirection: 'row',
    height: 54 + StatusBar.currentHeight,
    elevation: 3,
    paddingTop: StatusBar.currentHeight
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1,
  },
};

export default Header;
