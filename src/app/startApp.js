/**
 * @flow
 */
declare var console: any;

import * as React from 'react';
import {View, Text, ActivityIndicator, Button} from 'react-native';
import {init as initStore} from '@rematch/core';
import axios from 'axios';
import {Provider} from 'react-redux';
import Config from 'react-native-config';
import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';
import createRematchPersist from '@rematch/persist';

import createRouter from './createRouter';
import createModels from './createModels';
import createApiClient from './createApiClient';

import {PersistGate} from 'redux-persist/es/integration/react';
import {getPersistor} from '@rematch/persist';

console.ignoredYellowBox = ['Warning: isMounted', 'Remote debugger'];

type AppProps = {};

type AppStates = {
  storage: Storage,
  store: any,
  Router: any,
  error?: ?Error,
};

export default () => {
  const storage = new Storage({
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 60 * 5,
    enableCache: true,
  });

  const persistPlugin = createRematchPersist({
    whitelist: ['station', 'audioPlayer'],
    throttle: 5000,
    version: 2,
  });

  const init = () => {
    const apiClient = createApiClient({
      apiEndpoint: Config.RADIO_API_ENDPOINT,
    });
    const store = initStore({
      models: createModels(apiClient, storage),
      plugins: [persistPlugin],
    });
    const Router = createRouter({
      onStateChange: (currentRoute, prevRoute) => {
        const {screen} = currentRoute;
        const getInitialState: (any, any) => any =
          screen.getInitialState || Promise.resolve;
        getInitialState(currentRoute, prevRoute)
          .then(() => {})
          .catch(() => {});
      },
    });
    return {store, Router};
  };

  return class App extends React.Component<AppProps, AppStates> {
    state = {
      storage,
      ...init(),
    };

    render() {
      const {Router} = this.state;
      const persistor = getPersistor();
      return (
        <Provider store={this.state.store}>
          <PersistGate persistor={persistor} loading={null}>
            <Router />
          </PersistGate>
        </Provider>
      );
    }
  };
};
