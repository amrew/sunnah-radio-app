// @flow
import * as React from 'react';
import {View, Text, TouchableOpacity, Platform, StatusBar} from 'react-native';
import {
  DrawerItems,
  SafeAreaView,
  NavigationScreenProps,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import {Box, Link} from '../uikit';

type Props = {
  navigation: NavigationScreenProps,
};

class DrawerView extends React.Component<Props> {
  handleCloseDrawer = () => {
    this.props.navigation.closeDrawer();
  };

  render() {
    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{top: 'always', horizontal: 'never'}}>
        <LinearGradient colors={['#e45756', '#dd4141']} style={styles.header}>
          <Box flex={1}>
            <Text style={styles.headerTitle}>Menu</Text>
          </Box>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={this.handleCloseDrawer}>
            <Box>
              <Icon name="md-arrow-forward" color="#FFF" size={24} />
            </Box>
          </TouchableOpacity>
        </LinearGradient>
        <DrawerItems {...this.props} />
      </SafeAreaView>
    );
  }
}

const statusBarHeight = Platform.OS === 'ios' ? 24 : StatusBar.currentHeight;

const styles = {
  container: {
    flex: 1,
    ...(Platform.OS === 'ios'
      ? {
          marginTop: -24,
        }
      : null),
  },
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

export default DrawerView;
