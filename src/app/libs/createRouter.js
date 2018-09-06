/**
 * @flow
 */
import React from 'react';
import {InteractionManager} from 'react-native';

const getActiveRoute = (navigationState, router) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  const {getComponentForRouteName} = router;
  const screen = getComponentForRouteName(route.routeName);
  if (route.routes) {
    return getActiveRoute(route, screen.router);
  }
  return {...route, screen};
};

type RouterConfig = {
  onStateChange: (currentScreen: any, prevScreen: any) => any,
  AppNavigator: any,
};

export default (routerConfig: RouterConfig) => {
  const {onStateChange, AppNavigator} = routerConfig;

  return class Router extends React.Component<{}> {
    navigator: any;
    isTransitioning: boolean;

    componentDidMount() {
      const {nav} = this.navigator.state;
      const {router} = AppNavigator;
      const currentRoute = getActiveRoute(nav, router);
      onStateChange(currentRoute, null);
    }

    render() {
      return (
        <AppNavigator
          ref={navigator => (this.navigator = navigator)}
          onNavigationStateChange={(prevState, currentState) => {
            const {router} = AppNavigator;
            const currentRoute = getActiveRoute(currentState, router);
            const prevRoute = getActiveRoute(prevState, router);
            if (!this.isTransitioning) {
              this.isTransitioning = true;
              onStateChange(currentRoute, prevRoute);
              InteractionManager.runAfterInteractions(() => {
                this.isTransitioning = false;
              });
            }
          }}
        />
      );
    }
  };
};
