import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

export default function Index(props) {
  return <View></View>;
}

Index.propTypes = {
  bookingStyle: PropTypes.object,
  onUpdate: PropTypes.func,
};

Index.defaultProps = {
  bookingStyle: {},
  onUpdate: () => {},
};
