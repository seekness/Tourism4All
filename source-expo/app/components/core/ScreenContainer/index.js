import React, {useLayoutEffect} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import {Styles} from '@configs';
import {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Index = props => {
  const headerHeight = useHeaderHeight();
  const {
    style,
    children,
    navigation,
    options,
    edges,
    enableKeyboardAvoidingView,
  } = props;

  useLayoutEffect(() => {
    if (options) {
      if (Platform.OS === 'android') {
        options.headerLeft = null;
      }
      navigation?.setOptions(options);
    }
  }, [navigation, options]);

  return (
    <SafeAreaView style={[Styles.flex, style]} edges={edges}>
      <KeyboardAvoidingView
        style={Styles.flex}
        keyboardVerticalOffset={headerHeight}
        enabled={enableKeyboardAvoidingView}
        behavior={Platform.select({
          ios: 'padding',
          android: null,
        })}>
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export function useHeaderAnimated() {
  const translationY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(({contentOffset}) => {
    translationY.value = contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      interpolate(translationY.value, [0, 0, 150, 150], [0, 0, 1, 1]),
      {duration: 1},
    );

    return {
      opacity,
      position: 'absolute',
      width: '100%',
      top: 0,
      zIndex: 1,
    };
  });

  return {onScroll, headerStyle};
}

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node,
  navigation: PropTypes.any,
  options: PropTypes.any,
  edges: PropTypes.array,
  enableKeyboardAvoidingView: PropTypes.bool,
};

Index.defaultProps = {
  styles: {},
  children: null,
  navigation: null,
  options: null,
  edges: ['bottom', 'left', 'right'],
  enableKeyboardAvoidingView: false,
};

export default Index;
