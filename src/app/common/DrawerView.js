// @flow
import * as React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {
  DrawerItems,
  SafeAreaView,
  NavigationScreenProps,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import {Header, Box, Link} from '../uikit';

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
        <Header
          title={'Menu'}
          rightContent={
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={this.handleCloseDrawer}>
              <Box>
                <Icon name="md-arrow-forward" color="#FFF" size={24} />
              </Box>
            </TouchableOpacity>
          }
        />
        <DrawerItems {...this.props} />
      </SafeAreaView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    ...(Platform.OS === 'ios'
      ? {
          marginTop: -24,
        }
      : null),
  },
};

export default DrawerView;
