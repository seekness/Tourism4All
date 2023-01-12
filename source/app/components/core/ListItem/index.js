import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {SizedBox, Text} from '@components';
import {Styles} from '@configs';
import styles from './styles';

const Index = props => {
  const {style, size, leading, trailing, title, subtitle} = props;

  /**
   * export style for item
   * @return {*}
   */
  const styleBySize = () => {
    switch (size) {
      case 16:
        return styles.item16;
      case 24:
        return styles.item24;
      case 32:
        return styles.item32;
      case 36:
        return styles.item36;
      case 40:
        return styles.item40;

      default:
        return styles.item24;
    }
  };

  /**
   * export space icon and title
   * @return {*}
   */
  const spaceBySize = () => {
    switch (size) {
      case 16:
        return 8;
      case 24:
        return 8;

      default:
        return 12;
    }
  };

  /**
   * render subtitle
   * @return {*}
   */
  const renderSubTitle = () => {
    if (subtitle && size !== 16) {
      return (
        <Text
          typography="subtitle"
          type="secondary"
          style={styles.subTitle}
          numberOfLines={2}>
          {subtitle}
        </Text>
      );
    }
  };

  const itemStyle = StyleSheet.flatten([styleBySize(), style]);

  return (
    <TouchableOpacity {...props} style={itemStyle}>
      {leading && (
        <View style={[Styles.row, {paddingRight: spaceBySize()}]}>
          <SizedBox width={size} height={size}>
            {leading}
          </SizedBox>
        </View>
      )}
      <View style={styles.contentTitle}>
        <Text
          typography="title"
          weight={size === 16 ? 'regular' : 'bold'}
          numberOfLines={1}>
          {title}
        </Text>
        {renderSubTitle()}
      </View>
      {trailing}
    </TouchableOpacity>
  );
};

Index.propTypes = {
  size: PropTypes.oneOf([16, 24, 32, 46, 40]),
  leading: PropTypes.element,
  trailing: PropTypes.element,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Index.defaultProps = {
  size: 24,
  leading: null,
  trailing: null,
  title: 'Title',
  subtitle: null,
  style: {},
};

export default Index;
