// @flow
import * as React from 'react';
import {View, Text, StyleSheet, StatusBar, Platform} from 'react-native';
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
      <LinearGradient colors={['#e45756', '#dd4141']} style={styles.header}>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle={'light-content'}
        />
        {leftContent}
        <Box flex={1}>
          <Text style={styles.headerTitle}>{title}</Text>
        </Box>
        {rightContent}
      </LinearGradient>
    );
  }
}

const statusBarHeight = Platform.OS === 'ios' ? 24 : StatusBar.currentHeight;

const styles = {
  header: {
    flexDirection: 'row',
    height: 54 + statusBarHeight,
    elevation: 1,
    paddingTop: statusBarHeight,
    borderBottomWidth: 1,
    borderBottomColor: '#c83f41',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1,
  },
};

export default Header;
