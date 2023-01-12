import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import React from 'react';
import {store} from '@store';

const loadingRef = React.createRef();
const navigationRef = createNavigationContainerRef();

const getToken = () => store.getState().auth?.user?.token;

/**
 * show loading app
 */
function showLoading({loading, options, callback}) {
  loadingRef?.current?.showLoading({loading, options, callback});
}

/**
 * show popup app
 */
function showPopup({component, cancelable = true}) {
  push('Modal', {component, cancelable});
}

/**
 * root navigator push
 */
function push(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  }
}

/**
 * root navigator navigate
 */
function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

/**
 * navigator with authenticate
 */
function navigateAuth(...arg) {
  if (navigationRef.isReady()) {
    if (!getToken()) {
      navigationRef.navigate('SignIn', {
        onSuccess: () => {
          pop();
          navigationRef.navigate(...arg);
        },
      });
    } else {
      navigationRef.navigate(...arg);
    }
  }
}

/**
 * root navigator pop
 */
function pop(count = 1) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(count));
  }
}

/**
 * root navigator replace
 */
function replace(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

/**
 * root navigator pop all stack
 */
function popToTop() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
  }
}

export default {
  navigationRef,
  loadingRef,
  showLoading,
  showPopup,
  navigate,
  push,
  pop,
  replace,
  popToTop,
  navigateAuth,
};
