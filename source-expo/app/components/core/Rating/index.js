import React, {useContext} from 'react';
import {AirbnbRating} from 'react-native-ratings';
import PropTypes from 'prop-types';
import {Application} from '@components';
import {Colors} from '@configs';

const Index = props => {
  const {theme} = useContext(Application);
  const {style, rate, size, disabled, onFinishRating} = props;

  return (
    <AirbnbRating
      count={5}
      size={size}
      defaultRating={rate}
      showRating={false}
      isDisabled={disabled}
      onFinishRating={onFinishRating}
      selectedColor={Colors.amber}
      unSelectedColor={theme.colors.border}
      ratingContainerStyle={style}
      starStyle={{margin: size / 20}}
    />
  );
};

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  rate: PropTypes.number,
  size: PropTypes.number,
  disabled: PropTypes.bool,
  onFinishRating: PropTypes.func,
};

Index.defaultProps = {
  style: {},
  rate: 0,
  size: 12,
  disabled: false,
  onFinishRating: () => {},
};

export default Index;
