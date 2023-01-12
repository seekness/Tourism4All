import React from 'react';
import {Image, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
export default function Index(props) {
  const {style} = props;
  return (
    <View style={[styles.contaner, style]}>
      <Image {...props} style={styles.content} />
    </View>
  );
}

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  resizeMode: PropTypes.string,
};

Index.defaultProps = {
  style: {},
  resizeMode: 'cover',
};
