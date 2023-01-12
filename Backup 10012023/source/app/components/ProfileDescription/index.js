import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Image, Text} from '@components';
import styles from './styles';
import PropTypes from 'prop-types';
export default function ProfileDescription(props) {
  const {style, image, styleThumb, onPress, name, subName, description} = props;
  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <Image source={image} style={[styles.thumb, styleThumb]} />
      <View style={{flex: 1, alignItems: 'flex-start'}}>
        <Text headline semibold numberOfLines={1}>
          {name}
        </Text>
        <Text
          body2
          primaryColor
          style={{marginTop: 3, marginBottom: 3}}
          numberOfLines={1}>
          {subName}
        </Text>
        <Text footnote grayColor numberOfLines={2} style={{paddingRight: 20}}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

ProfileDescription.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  name: PropTypes.string,
  subName: PropTypes.string,
  description: PropTypes.string,
  styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
};

ProfileDescription.defaultProps = {
  image: '',
  name: '',
  subName: '',
  description: '',
  styleThumb: {},
  onPress: () => {},
  style: {},
};
