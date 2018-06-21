// @flow
import * as React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Text,
} from 'react-native';
import {withNavigation} from 'react-navigation';

type Props = {
  navigation: any,
  children: React.Node,
  to?: string,
  params?: {},
  onPress?: (navigation: any) => any,
  style?: {},
  inline?: boolean,
};

class Link extends React.Component<Props> {
  handlePress = () => {
    const {to, params, onPress} = this.props;
    if (to) {
      this.props.navigation.navigate(to, params);
    } else {
      onPress && onPress(this.props.navigation);
    }
  };

  render() {
    const {style, inline} = this.props;

    if (inline) {
      return <Text onPress={this.handlePress}>{this.props.children}</Text>;
    }

    return (
      <TouchableOpacity
        style={style}
        activeOpacity={0.75}
        onPress={this.handlePress}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

export default withNavigation(Link);
