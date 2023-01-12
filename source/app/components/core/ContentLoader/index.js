import React, {useContext, useEffect, useMemo, useRef} from 'react';
import PropTypes from 'prop-types';
import {Animated, Platform, useWindowDimensions, View} from 'react-native';
import {Application, LinearGradient} from '@components';
import styles from './styles';
import {Opacity} from '@configs';

const Index = props => {
  const {width} = useWindowDimensions();
  const {theme} = useContext(Application);
  const beginShimmerPosition = useRef(new Animated.Value(-1)).current;
  const {style} = props;

  const shimmerColors = [
    theme.colors.border + Opacity['25'],
    theme.colors.border + Opacity['50'],
    theme.colors.border,
  ];
  const location = [0.3, 0.5, 0.7];
  const linearTranslate = beginShimmerPosition.interpolate({
    inputRange: [-1, 1],
    outputRange: [0, width],
  });
  const animatedValue = useMemo(() => {
    return Animated.loop(
      Animated.timing(beginShimmerPosition, {
        toValue: 1,
        delay: 0,
        duration: 1000,
        useNativeDriver: Platform.OS !== 'web',
      }),
    );
  }, [beginShimmerPosition]);

  useEffect(() => {
    animatedValue.start();
    return () => {
      animatedValue.stop();
    };
  }, [animatedValue]);

  return (
    <View style={[styles.container, style]}>
      <View style={{flex: 1, backgroundColor: shimmerColors[0]}}>
        <Animated.View
          style={{flex: 1, transform: [{translateX: linearTranslate}]}}>
          <LinearGradient
            colors={shimmerColors}
            style={{flex: 1, width: width}}
            start={{
              x: -1,
              y: 0.5,
            }}
            end={{
              x: 2,
              y: 0.5,
            }}
            locations={location}
          />
        </Animated.View>
      </View>
    </View>
  );
};

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Index.defaultProps = {
  styles: {},
};

export default Index;
