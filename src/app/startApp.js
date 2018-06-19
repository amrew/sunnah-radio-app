/**
 * @flow
 */
declare var console: any;

import * as React from 'react';
import {View, Text, ActivityIndicator, Button} from 'react-native';
import {init as initStore} from '@rematch/core';
import axios from 'axios';
import {Provider} from 'react-redux';

import createRouter from './createRouter';
import createModels from './createModels';
import createApiClient from './createApiClient';

console.ignoredYellowBox = ['Warning: isMounted', 'Remote debugger'];

type AppProps = {};

type AppStates = {
  store: any,
  Router: any,
  error?: ?Error,
};

export default () => {
  const init = () => {
    const apiClient = createApiClient();
    const store = initStore({
      models: createModels(apiClient),
    });
    const Router = createRouter({
      onStateChange: (currentRoute, prevRoute) => {
        const {screen} = currentRoute;
        if (screen.getInitialState) {
          screen
            .getInitialState(currentRoute, prevRoute)
            .then(() => {})
            .catch(() => {});
        }
      },
    });
    return {store, Router};
  };

  return class App extends React.Component<AppProps, AppStates> {
    state = {
      ...init(),
    };

    render() {
      const {Router} = this.state;
      return (
        <Provider store={this.state.store}>
          <Router />
        </Provider>
      );
    }
  };
};
