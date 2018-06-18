/**
 * @flow
 */
declare var console: any;

import * as React from 'react';
import {View, Text, ActivityIndicator, Button} from 'react-native';
import Routers from './Routers';
import {init as initStore} from '@rematch/core';
import {Provider} from 'react-redux';
import createModels from './createModels';
import axios from 'axios';

console.ignoredYellowBox = ['Warning: isMounted', 'Remote debugger'];

const startApp = () => {
  const apiClient = axios.create({
    baseURL: 'http://radioislam.or.id',
  });
  apiClient.defaults.timeout = 5000;
  const store = initStore({
    models: createModels(apiClient),
  });
  return {store};
};

type Props = {};

type States = {
  loading: boolean,
  store: any,
  error?: ?Error,
};

export default class App extends React.Component<Props, States> {
  state = {
    loading: true,
    ...startApp(),
  };

  render() {
    return (
      <Provider store={this.state.store}>
        <Routers />
      </Provider>
    );
  }
}
