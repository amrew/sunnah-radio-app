// @flow
import * as React from 'react';
import {View, Text, StyleSheet, StatusBar, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {withNavigation, NavigationScreenProps} from 'react-navigation';

import Box from './Box';
import Link from './Link';

type Props = {
  title: string,
  rightContent: React.Node,
  centerContent: React.Node,
  leftContent: React.Node,
  hasHistory: boolean,
  navigation: NavigationScreenProps,
  backgroundWhite: boolean,
};

class Header extends React.Component<Props> {
  handleBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {
      title,
      rightContent,
      centerContent,
      leftContent,
      hasHistory,
      backgroundWhite,
    } = this.props;
    return (
      <LinearGradient colors={['#e45756', '#dd4141']} style={styles.header}>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle={'light-content'}
        />
        <View
          style={{
            ...styles.content,
            ...(backgroundWhite ? styles.headerWhite : null),
          }}>
          {hasHistory && (
            <Link onPress={this.handleBack}>
              <Box>
                <Icon name="md-arrow-back" color={backgroundWhite ? '#262630' : '#FFF'} size={24} />
              </Box>
            </Link>
          )}
          {leftContent}
          {centerContent ? (
            centerContent
          ) : (
            <Box flex={1}>
              <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
            </Box>
          )}
          {rightContent}
        </View>
      </LinearGradient>
    );
  }
}

const statusBarHeight = Platform.OS === 'ios' ? 24 : StatusBar.currentHeight;

const styles = {
  header: {
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
  content: {
    flexDirection: 'row',
  },
  headerWhite: {
    backgroundColor: '#fff',
  },
};

export default withNavigation(Header);
