// @flow
import * as React from 'react';
import {View, Text} from 'react-native';

type Props = {
  title: string,
};

class SectionTitle extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    padding: 24,
    backgroundColor: '#212121',
  },
  titleText: {
    color: '#FFF',
    fontSize: 16,
  },
};

export default SectionTitle;
