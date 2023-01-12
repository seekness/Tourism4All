import React, {useContext} from 'react';
import {TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {Application, Icon, SizedBox, Text} from '@components';
import {Opacity, Styles} from '@configs';
import styles from './styles';

const Index = props => {
  const {theme} = useContext(Application);
  const {
    style,
    onPress,
    size,
    label,
    info,
    value,
    placeholder,
    onPressInfo,
    error,
    leading,
    trailing,
  } = props;

  /**
   * get border color
   */
  const getBorderColor = () => {
    if (error) {
      return theme.colors.error;
    }
    return theme.colors.border;
  };

  /**
   * get size style
   */
  const getSizeStyle = () => {
    switch (size) {
      case 'large':
        return styles.large;
      case 'small':
        return styles.small;

      default:
        return styles.large;
    }
  };

  /**
   * get text typography
   */
  const getTypography = () => {
    switch (size) {
      case 'large':
        return 'h3';
      case 'small':
        return 'h4';
      default:
        return 'h4';
    }
  };

  /**
   * get text weight
   */
  const getWeight = () => {
    switch (size) {
      case 'large':
        return 'bold';
      case 'small':
        return 'regular';
      default:
        return 'regular';
    }
  };

  /**
   * get size style
   */
  const getIconSizeStyle = () => {
    switch (size) {
      case 'large':
        return 24;
      case 'small':
        return 16;

      default:
        return 24;
    }
  };

  /**
   * render info icon button
   */
  const renderInfo = () => {
    if (info) {
      return (
        <TouchableOpacity style={styles.rowInfo} onPress={onPressInfo}>
          <Icon
            name="information-outline"
            color={theme.colors.secondary}
            size={16}
          />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[getSizeStyle(), {borderColor: getBorderColor()}]}
        onPress={onPress}>
        <View style={styles.rowContent}>
          {leading && (
            <View style={Styles.row}>
              {leading}
              <SizedBox width={12} />
            </View>
          )}
          <Text
            typography={getTypography()}
            weight={getWeight()}
            type={value ? 'primary' : 'secondary'}
            numberOfLines={1}
            style={[
              Styles.flex,
              !value && {color: theme.colors.textSecondary + Opacity['40']},
            ]}>
            {value ?? placeholder}
          </Text>
          <View style={styles.trailingContent}>
            {trailing ?? (
              <Icon
                name="chevron-down"
                size={getIconSizeStyle()}
                color={theme.colors.primary}
              />
            )}
          </View>
          <View
            style={[styles.infoContent, {backgroundColor: theme.colors.card}]}>
            <Text typography="subtitle" type="secondary">
              {label}
            </Text>
            {renderInfo()}
          </View>
        </View>
      </TouchableOpacity>
      {error && (
        <>
          <SizedBox height={4} />
          <Text typography="subtitle" color="error">
            {error}
          </Text>
        </>
      )}
    </View>
  );
};

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  size: PropTypes.oneOf(['large', 'small']),
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.bool,
  onPressInfo: PropTypes.func,
  leading: PropTypes.element,
  trailing: PropTypes.element,
};

Index.defaultProps = {
  style: {},
  onPress: () => {},
  size: 'small',
  label: 'Label',
  value: null,
  placeholder: null,
  error: null,
  info: false,
  onPressInfo: () => {},
  leading: null,
  trailing: null,
};

export default Index;
